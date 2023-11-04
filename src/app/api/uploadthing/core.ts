import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { PineconeStore } from "langchain/vectorstores/pinecone"
import { pinecone } from "@/lib/pincone";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            const { getUser } = getKindeServerSession()
            const user = getUser()


            // If you throw, the user will not be able to upload
            if (!user || !user.id) throw new Error("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload

            const createdFile = await db.file.create({
                data: {
                    key: file.key,
                    name: file.name,
                    userId: metadata.userId,
                    url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
                    uploadStatus: "PROCESSING"
                }
            })

            try {
                const response = await fetch(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`)

                const blob = await response.blob()

                const loader = new PDFLoader(blob)

                const pageLevelDocs = await loader.load()

                const pagesAmt = pageLevelDocs.length

                //vectorize and index entire document

                console.log("Creating pinecone")


                const pineconeIndex = pinecone.Index("pdfaskmate")

                const embeddings = new OpenAIEmbeddings({
                    openAIApiKey: process.env.OPENAI_API_KEY
                })

                await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
                    pineconeIndex,
                    // namespace: createdFile.id
                })

                await db.file.update({
                    data: {
                        uploadStatus: "SUCCESS"
                    },
                    where: {
                        id: createdFile.id
                    }
                })

            } catch (err) {
                console.log("error", err)
                await db.file.update({
                    data: {
                        uploadStatus: "FAILED"
                    },
                    where: {
                        id: createdFile.id
                    }
                })
            }

            
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;