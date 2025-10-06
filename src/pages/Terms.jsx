import React from 'react';
import { DocumentTextIcon, ShieldCheckIcon, ScaleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';

function Terms() {
    return (
        <>
        <Navbar />
                <div className="min-h-screen bg-white text-gray-900 px-6 md:px-24 py-16 max-w-5xl mx-auto font-lato">

            

            {/* Hero Section */}
            <header className="flex flex-col md:flex-row items-center gap-8 mb-16">
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-5xl font-oswald font-bold mb-4 text-black">
                        Terms &amp; Conditions
                    </h1>
                    <p className="text-lg text-gray-700 font-medium max-w-lg mx-auto md:mx-0">
                        Please read these terms carefully before using Creozone’s services.
                    </p>
                </div>
            </header>

            {/* Important Callout */}
            <div className="bg-rose-50 border-l-4 border-rose-500 p-6 mb-10 rounded-md text-rose-700 font-semibold flex items-center gap-3">
                <ExclamationCircleIcon className="w-6 h-6 flex-shrink-0" />
                <p>By using Creozone, you agree to these Terms and Conditions. Please review them carefully.</p>
            </div>

            {/* Terms Sections */}
            <section className="space-y-12 text-gray-800 text-lg leading-relaxed">
                <article>
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-black mb-3">
                        <DocumentTextIcon className="w-6 h-6 text-rose-500" />
                        Introduction
                    </h2>
                    <p>
                        Welcome to Creozone. By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions.
                    </p>
                </article>

                <article>
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-black mb-3">
                        <ShieldCheckIcon className="w-6 h-6 text-rose-500" />
                        User Responsibilities
                    </h2>
                    <p>
                        Users must use Creozone responsibly and not engage in any unlawful or harmful activities while using the platform.
                    </p>
                </article>

                <article>
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-black mb-3">
                        <ScaleIcon className="w-6 h-6 text-rose-500" />
                        Intellectual Property
                    </h2>
                    <p>
                        All content, trademarks, and intellectual property on Creozone are owned by Creozone or its licensors and are protected by applicable laws.
                    </p>
                </article>

                <article>
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-black mb-3">
                        <ExclamationCircleIcon className="w-6 h-6 text-rose-500" />
                        Limitation of Liability
                    </h2>
                    <p>
                        Creozone is not liable for any damages resulting from the use or inability to use the platform or services.
                    </p>
                </article>

                <article>
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-black mb-3">
                        <DocumentTextIcon className="w-6 h-6 text-rose-500" />
                        Changes to Terms
                    </h2>
                    <p>
                        Creozone reserves the right to update these Terms and Conditions at any time. Changes will be posted on this page with the date updated below.
                    </p>
                </article>
            </section>

            <footer className="mt-16 text-center text-gray-500 text-sm">
                Last updated: June 1, 2025
            </footer>
        </div>
        </>

    );
}

export default Terms;
