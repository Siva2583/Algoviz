import React from 'react';

const TutorialTab = ({ data }) => { 
    if (!data) return null;
    return (
        <div className="flex flex-col md:flex-row gap-8 animate-fade-in pb-10 w-full h-full text-[#fff] font-sans">
            <div className="md:w-1/4 hidden md:flex flex-col sticky top-4 h-fit max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
                <h3 className="text-[#ffbf00] font-bold mb-4 uppercase tracking-widest text-sm border-b border-gray-800 pb-2">{data.title}</h3>
                <nav className="flex flex-col space-y-3 border-l-2 border-[#111] pl-4 font-mono text-[13px]">
                    <a href="#overview" className="text-gray-400 hover:text-[#ffbf00] transition-colors py-1 hover:translate-x-1 duration-200">01. Overview</a>
                    <a href="#why-exists" className="text-gray-400 hover:text-[#ffbf00] transition-colors py-1 hover:translate-x-1 duration-200">02. Why This Exists</a>
                    <a href="#how-it-works" className="text-gray-400 hover:text-[#ffbf00] transition-colors py-1 hover:translate-x-1 duration-200">03. How It Works</a>
                    <a href="#dry-run" className="text-[#ffbf00] font-bold transition-colors py-1 flex items-center gap-2 hover:translate-x-1 duration-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffbf00] animate-pulse"></span> 04. Dry Run
                    </a>
                    <a href="#pseudocode" className="text-gray-400 hover:text-[#ffbf00] transition-colors py-1 hover:translate-x-1 duration-200">05. Pseudocode</a>
                    <a href="#memory-structure" className="text-gray-400 hover:text-[#ffbf00] transition-colors py-1 hover:translate-x-1 duration-200">06. Memory Structure</a>
                    <a href="#complexity" className="text-gray-400 hover:text-[#ffbf00] transition-colors py-1 hover:translate-x-1 duration-200">07. Complexity</a>
                    <a href="#pattern-recognition" className="text-gray-400 hover:text-[#ffbf00] transition-colors py-1 hover:translate-x-1 duration-200">08. Pattern Recognition</a>
                    <a href="#applications" className="text-gray-400 hover:text-[#ffbf00] transition-colors py-1 hover:translate-x-1 duration-200">09. Applications</a>
                    <a href="#interview-mistakes" className="text-gray-400 hover:text-[#ffbf00] transition-colors py-1 hover:translate-x-1 duration-200">10. Interview Mistakes</a>
                </nav>
            </div>
            <div className="md:w-3/4 flex flex-col gap-12 overflow-y-auto pr-4 pb-20">
                <section id="overview" className="scroll-mt-8">
                    <h2 className="text-2xl font-bold text-[#fff] mb-4 flex items-center gap-3">
                        <span className="text-[#ffbf00] font-mono text-xl">{'>'}</span> Overview
                    </h2>
                    <p className="leading-relaxed bg-[#080808] p-5 rounded-lg border border-gray-800 text-gray-300">
                        {data.overview}
                    </p>
                </section>

                {data.whyExists && (
                    <section id="why-exists" className="scroll-mt-8">
                        <h2 className="text-2xl font-bold text-[#fff] mb-4 flex items-center gap-3">
                            <span className="text-[#ffbf00] font-mono text-xl">{'>'}</span> Why This Exists
                        </h2>
                        <p className="leading-relaxed bg-[#111] p-5 rounded-lg border-l-4 border-l-[#ffbf00] text-gray-300 italic">
                            "{data.whyExists}"
                        </p>
                    </section>
                )}
                <section id="how-it-works" className="scroll-mt-8">
                    <h2 className="text-2xl font-bold text-[#fff] mb-4 flex items-center gap-3">
                        <span className="text-[#ffbf00] font-mono text-xl">{'>'}</span> How It Works
                    </h2>
                    <ol className="list-decimal list-inside space-y-4 bg-[#080808] p-6 rounded-lg border border-gray-800 font-mono text-sm leading-relaxed text-gray-300">
                        {data.mechanics.map((step, i) => (
                            <li key={i} className="marker:text-[#ffbf00]">{step}</li>
                        ))}
                    </ol>
                </section>

                <section id="dry-run" className="scroll-mt-8">
                    <h2 className="text-2xl font-bold text-[#ffbf00] mb-4 flex items-center gap-3">
                        <span className="text-[#fff] font-mono text-xl">{'>'}</span> Dry Run Example
                    </h2>
                    <div className="bg-[#080808] border border-[#ffbf00]/30 rounded-lg p-6 shadow-[0_0_20px_rgba(255,191,0,0.05)]">
                        <div className="space-y-6">
                            {data.dryRun.map((run, i) => (
                                <div key={i} className="border-l-2 border-[#ffbf00] pl-5 relative">
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 bg-[#ffbf00] rounded-full"></div>
                                    <span className="font-bold text-[#fff] block text-lg mb-1">{run.step}</span>
                                    <span className="text-sm font-mono text-[#ffbf00] bg-[#ffbf00]/10 px-2 py-1 rounded inline-block">{run.state}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="pseudocode" className="scroll-mt-8">
                    <h2 className="text-2xl font-bold text-[#fff] mb-4 flex items-center gap-3">
                        <span className="text-[#ffbf00] font-mono text-xl">{'>'}</span> Pseudocode
                    </h2>
                    <div className="relative">
                        <div className="absolute top-0 right-0 bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded-bl-lg font-mono rounded-tr-lg">algorithm.js</div>
                        <pre className="bg-[#080808] border border-gray-800 rounded-lg p-6 pt-10 overflow-x-auto text-[#fff] font-mono text-sm leading-loose">
                            <code>{data.pseudo}</code>
                        </pre>
                    </div>
                </section>
                {data.memory && (
                    <section id="memory-structure" className="scroll-mt-8">
                        <h2 className="text-2xl font-bold text-[#fff] mb-4 flex items-center gap-3">
                            <span className="text-[#ffbf00] font-mono text-xl">{'>'}</span> Memory Structure
                        </h2>
                        <div className="bg-[#111] p-5 rounded-lg border border-gray-800 flex items-start gap-4">
                            <div className="mt-1 text-[#ffbf00] opacity-80">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z"></path><path d="M4 12h16M12 4v16"></path></svg>
                            </div>
                            <p className="leading-relaxed text-gray-300 font-mono text-sm">
                                {data.memory}
                            </p>
                        </div>
                    </section>
                )}

                <section id="complexity" className="scroll-mt-8">
                    <h2 className="text-2xl font-bold text-[#fff] mb-4 flex items-center gap-3">
                        <span className="text-[#ffbf00] font-mono text-xl">{'>'}</span> Complexity
                    </h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-[#080808] border border-gray-800 p-6 rounded-lg flex flex-col items-center relative overflow-hidden group hover:border-[#ffbf00]/50 transition-colors">
                            <span className="text-xs text-gray-500 font-bold tracking-widest mb-2 z-10">TIME COMPLEXITY</span>
                            <span className="text-3xl font-mono text-[#ffbf00] font-bold z-10">{data.time}</span>
                        </div>
                        <div className="bg-[#080808] border border-gray-800 p-6 rounded-lg flex flex-col items-center relative overflow-hidden group hover:border-[#ffbf00]/50 transition-colors">
                            <span className="text-xs text-gray-500 font-bold tracking-widest mb-2 z-10">SPACE COMPLEXITY</span>
                            <span className="text-3xl font-mono text-[#fff] font-bold z-10">{data.space}</span>
                        </div>
                    </div>
                </section>
                {data.pattern && (
                    <section id="pattern-recognition" className="scroll-mt-8">
                        <h2 className="text-2xl font-bold text-[#fff] mb-4 flex items-center gap-3">
                            <span className="text-[#ffbf00] font-mono text-xl">{'>'}</span> Pattern Recognition
                        </h2>
                        <div className="bg-[#ffbf00]/10 border border-[#ffbf00]/30 rounded-lg p-6">
                            <span className="block text-[#ffbf00] text-xs font-bold uppercase tracking-widest mb-4">When to use this algorithm:</span>
                            <ul className="space-y-3 text-sm text-gray-200 font-mono">
                                {data.pattern.map((pat, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <span className="text-[#ffbf00]">✓</span> 
                                        <span>{pat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
                {data.apps && (
                    <section id="applications" className="scroll-mt-8">
                        <h2 className="text-2xl font-bold text-[#fff] mb-4 flex items-center gap-3">
                            <span className="text-[#ffbf00] font-mono text-xl">{'>'}</span> Applications
                        </h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {data.apps.map((app, i) => (
                                <li key={i} className="bg-[#080808] border border-gray-800 p-3 rounded text-gray-300 text-sm">
                                    {app}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {data.mistakes && (
                    <section id="interview-mistakes" className="scroll-mt-8">
                        <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-3">
                            <span className="text-red-500 font-mono text-xl">{'>'}</span> Interview Mistakes
                        </h2>
                        <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-6">
                            <ul className="space-y-4 text-sm text-gray-300">
                                {data.mistakes.map((mistake, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <span className="text-red-500 text-lg mt-0.5">⚠️</span> 
                                        <span className="leading-relaxed">{mistake}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
};

export default TutorialTab;