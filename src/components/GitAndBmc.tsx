import Link from 'next/link';
import React from 'react';
import { Button, buttonVariants } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';

const GitHubRepoCard = () => {
    return (<div>
        <h3 className='mt-8 mx-5 mb-5 font-bold'>If you liked my work then show some ❤️ and ⭐ the repo</h3>
        <Link
            className={buttonVariants({
                size: 'sm',
                className: 'mt-2',
                variant: 'secondary'
            })}
            href='https://github.com/Sahil-pvt/PDFAskMate'
            target='_blank'>
            GitHub Repository
        </Link>
    </div>
    );
};

const BuyMeACoffeeCard = () => {
    return (<div>
        <h3 className='mt-8 mb-5 font-bold'>
            Sponsor this project 😊
        </h3>
        <Link
            className={buttonVariants({
                size: 'sm',
                className: 'mt-2',
                variant: 'secondary',
            })}
            href='https://www.buymeacoffee.com/sahilsorte'
            target='_blank'>
            Buy Me a Coffee
        </Link>
    </div>
    );
};

const ShadcnUICards = () => {
    return (
        <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
                <div className='mt-16 items-center justify-center flow-root sm:mt-24'>
                    <div className='rounded-lg border bg-card text-card-foreground shadow-sm'>
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

