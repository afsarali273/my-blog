"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Play, Book, Code, Github, Linkedin, Twitter, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800">
            <main className="pt-24">
                <section className="container mx-auto px-6 py-12">
                    <motion.div className="flex flex-col md:flex-row items-center justify-between gap-12"
                                variants={stagger} initial="initial" animate="animate">
                        <motion.div className="md:w-1/2" {...fadeInUp}>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                Hi, I'm <span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Afsar</span>
                            </h1>
                            <h2 className="text-2xl md:text-3xl text-gray-600 mb-6">Lead SDET</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                A Test Engineer with a deep passion for software development. My goal is to empower test
                                engineers with the tools and knowledge to succeed in automation, DevOps, and backend
                                development. Through my YouTube channel, I break down complex topics to make them easy
                                to understand for those at the beginning of their career.

                                With hands-on expertise in Web and Mobile Automation, API Testing, MERN stack, and Java
                                development, I strive to create efficient, innovative solutions. Proudly Indian, now
                                based in Singapore !
                            </p>
                            <p className="text-lg text-gray-600 mb-8">I'm always learning and sharing my journey...</p>
                            <div className="flex space-x-4 mb-8">
                                <a href="https://github.com/afsarali273" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="icon" className="rounded-full">
                                        <Github className="h-5 w-5"/>
                                    </Button>
                                </a>
                                <a href="https://www.linkedin.com/in/afsar-ali-3465a556" target="_blank"
                                   rel="noopener noreferrer">
                                    <Button variant="outline" size="icon" className="rounded-full">
                                        <Linkedin className="h-5 w-5"/>
                                    </Button>
                                </a>
                                <a href="https://x.com/afsarali273" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="icon" className="rounded-full">
                                        <X className="h-5 w-5"/>
                                    </Button>
                                </a>
                            </div>

                            <a href="https://github.com/afsarali273?tab=repositories" target="_blank"
                               rel="noopener noreferrer">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    View My Projects <ChevronRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </a>
                        </motion.div>
                        <motion.div className="md:w-1/2 flex justify-center" {...fadeInUp}>
                            <Image
                                src="/profile_pic.jpeg?height=400&width=400"
                                alt="Your Name"
                                width={400}
                                height={400}
                                className="rounded-full border-4 border-blue-600 shadow-lg"
                            />
                        </motion.div>
                    </motion.div>
                </section>

                <motion.section className="container mx-auto px-6 py-12" variants={stagger} initial="initial"
                                animate="animate">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Quick Links</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {title: 'My Resume', icon: Code, href: '/resume'},
                            {title: 'Contact Me', icon: ChevronRight, href: '/contact'},
                            {title: 'All Blog Posts', icon: Book, href: '/blog'}
                        ].map((link, index) => (
                            <motion.div key={link.title} {...fadeInUp} transition={{delay: index * 0.1}}>
                                <Link href={link.href} passHref>
                                    <Button variant="outline"
                                            className="w-full h-24 text-lg flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 border-blue-600 text-blue-600 hover:text-blue-700">
                                        <link.icon className="h-6 w-6"/>
                                        <span>{link.title}</span>
                                    </Button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="container mx-auto px-6 py-12" variants={stagger} initial="initial"
                                animate="animate">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">YouTube Playlists</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Appium tutorial for Beginner to Advanced",
                                videos: 10,
                                url: "https://www.youtube.com/embed/PLXBKC3hh6AEqcB81YKaqZaGy11DGmmonD",
                                playlistUrl: "https://www.youtube.com/playlist?list=PLXBKC3hh6AEqcB81YKaqZaGy11DGmmonD"
                            },
                            {
                                title: "Webdriverio V7",
                                videos: 8,
                                url: "https://www.youtube.com/embed/PLXBKC3hh6AEppXhwvebNGDZl_iBBCdw5E",
                                playlistUrl: "https://www.youtube.com/playlist?list=PLXBKC3hh6AEppXhwvebNGDZl_iBBCdw5E"
                            },
                            {
                                title: "WebDriverio -Jasmine -Complete Tutorials",
                                videos: 12,
                                url: "https://www.youtube.com/embed/PLXBKC3hh6AEomZJaIPjqQVd6K66lU0Ixv",
                                playlistUrl: "https://www.youtube.com/playlist?list=PLXBKC3hh6AEomZJaIPjqQVd6K66lU0Ixv"
                            },
                            {
                                title: "Google API - Automation ,Gmail,GDrive,Sheet etc",
                                videos: 15,
                                url: "https://www.youtube.com/embed/PLXBKC3hh6AEqpcgZpoIhRoUeads9nu8uG",
                                playlistUrl: "https://www.youtube.com/playlist?list=PLXBKC3hh6AEqpcgZpoIhRoUeads9nu8uG"
                            }
                        ].map((playlist, index) => (
                            <motion.div key={playlist.title} {...fadeInUp} transition={{delay: index * 0.1}}>
                                <Card
                                    className="bg-white border-blue-200 hover:shadow-md transition-shadow duration-300">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{playlist.title}</h3>
                                        <p className="text-gray-600 mb-4">{playlist.videos} videos</p>
                                        <div className="mb-4">
                                            <iframe
                                                width="100%"
                                                height="200"
                                                src={playlist.url}
                                                title={playlist.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        <a href={playlist.playlistUrl} target="_blank" rel="noopener noreferrer">
                                            <Button
                                                variant="outline"
                                                className="w-full text-blue-600 hover:text-blue-700 border-blue-600 hover:bg-blue-50"
                                            >
                                                <Play className="mr-2 h-4 w-4"/> Watch Playlist
                                            </Button>
                                        </a>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="container mx-auto px-6 py-12" variants={stagger} initial="initial"
                                animate="animate">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Blog Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Post #1",
                                excerpt: "Learn how to set up your first Next.js project and understand its key features...",
                                date: "2023-07-15"
                            },
                            {
                                title: "Post #2",
                                excerpt: "Dive deep into React Hooks and learn how to use them effectively in your projects...",
                                date: "2023-06-22"
                            },
                            {
                                title: "Post #3",
                                excerpt: "Discover best practices for creating robust and scalable APIs using Node.js...",
                                date: "2023-05-10"
                            }
                        ].map((post, index) => (
                            <motion.div key={post.title} {...fadeInUp} transition={{delay: index * 0.1}}>
                                <Card
                                    className="bg-white border-blue-200 hover:shadow-md transition-shadow duration-300">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h3>
                                        <p className="text-gray-500 mb-2">{post.date}</p>
                                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                        <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0">
                                            Read More <ChevronRight className="ml-1 h-4 w-4"/>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </main>
        </div>
    )
}
