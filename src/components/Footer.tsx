import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { CodeXml, Terminal } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-black py-12 border-t border-white/10">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <span className="text-xl font-bold tracking-tight text-white">
                                ACM <span className="text-[#00BCA2]">CLUB</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400">
                            Connecting students through technology. Learn, build, and compete together.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00BCA2] hover:text-black transition-colors cursor-pointer"><Terminal size={16} /></div>
                            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00BCA2] hover:text-black transition-colors cursor-pointer"><CodeXml size={16} /></div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-[#00BCA2] cursor-pointer">Projects</li>
                            <li className="hover:text-[#00BCA2] cursor-pointer">Leaderboard</li>
                            <li className="hover:text-[#00BCA2] cursor-pointer">Community</li>
                            <li className="hover:text-[#00BCA2] cursor-pointer">Members</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-[#00BCA2] cursor-pointer">Documentation</li>
                            <li className="hover:text-[#00BCA2] cursor-pointer">Tutorials</li>
                            <li className="hover:text-[#00BCA2] cursor-pointer">Events</li>
                            <li className="hover:text-[#00BCA2] cursor-pointer">Contact Us</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Subscribe</h4>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white w-full focus:outline-hidden focus:border-[#00BCA2]" />
                            <Button size="sm" className="bg-[#00BCA2] text-black hover:bg-[#00BCA2]/90">Go</Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500">
                    © 2026 ACM College Club. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer