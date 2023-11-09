import Link from 'next/link';
import React from 'react';
import { Button, buttonVariants } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';

const GitHubRepoCard = () => {
    return (
        <Card className='mx-5 mt-5 mb-4 flex items-center justify-center overflow-hidden border border-gray-200 bg-white px-3 shadow-md backdrop-blur transition-all'>
            <CardHeader>
                <h3>If you liked my work then show some ❤️ and ⭐ the repo</h3>
            </CardHeader>
            <CardContent>
                <Link
                    className={buttonVariants({
                        size: 'sm',
                        className: 'mt-5',
                        variant: 'secondary'
                    })}
                    href='https://github.com/Sahil-pvt/PDFAskMate'
                    target='_blank'>
                    GitHub Repository
                </Link>
                
              
            </CardContent>
        </Card>
    );
};

const BuyMeACoffeeCard = () => {
    return (
        <Card className='mx-5 mt-5 mb-4 flex justify-center overflow-hidden border border-gray-200 bg-white px-3 shadow-md backdrop-blur transition-all'>
            <CardHeader>
                <h3>Sponsor this project 😊</h3>
            </CardHeader>
            <CardContent>
                <Link
                    className={buttonVariants({
                        size: 'sm',
                        className: 'mt-5',
                        variant: 'secondary',
                    })}
                    href='https://www.buymeacoffee.com/sahilsorte'
                    target='_blank'>
                    Buy Me a Coffee
                </Link>

            </CardContent>
        </Card>
    );
};

const ShadcnUICards = () => {
    return (
        <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
                <div className='mt-16 items-center justify-center flow-root sm:mt-24'>
                    <div className='-m-2 rounded-xl bg-gray-200 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                        <GitHubRepoCard />
                        
                        <BuyMeACoffeeCard />
                        <h3 className='mt-8 mb-5 font-bold'>
                            Made with ❤️ by Sahil Sorte
                        </h3>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ShadcnUICards;