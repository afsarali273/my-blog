"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Mail, Phone, MapPin, Linkedin, Briefcase, GraduationCap, Award, Trophy, Download } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf"

export default function PremiumResumeTemplate() {
    const [downloadFormat, setDownloadFormat] = useState<'pdf' | 'doc' | null>(null)

    const skills = [
        'Java', 'TypeScript', 'JavaScript', 'MicroServices','Selenium', 'Appium','UFT', 'TOSCA','WebDriverIO','Playwright', 'Oracle DB','MongoDB', 'Spring MVC', 'Spring Boot','ExpressJs','Cucumber','JMeter','Performance Testing','K6',
        'Maven', 'REST API', 'React','Angular','GIT', 'ALM', 'Kubernates', 'Docker', 'Jenkins','AWS','GCP', 'BluePrism', 'UiPath', 'Salesforce','Guidewire',"QA"
    ]

    const certifications = [
        { name: 'AWS Certified Solutions Architect', image: '/aws.png?height=50&width=60' },
        { name: 'Oracle Certified Professional, Java SE 11 Developer', image: '/java.png?height=50&width=60' },
        { name: 'Full Stack Development - UpGrad', image: '/upgrad.png?height=50&width=60' },
        { name: "Government on Commercial Cloud ,Singapore", image: '/govtech.png?height=50&width=60' },
    ]

    const experiences = [
        {
            company: 'PropertyGuru Group',
            logo: '/pg.png?height=50&width=50',
            position: 'Lead SDET',
            duration: '06/2022 - current',
            location: 'Singapore',
            responsibilities: [
                "Manage the end-to-end QA process for the Fintech team, ensuring quality at every stage of the software development lifecycle.",
                "Lead automation efforts across Web, Mobile, and API testing using modern technologies and frameworks.",
                "Develop and maintain test automation scripts in TypeScript, Node.js, and Java for seamless integration with CI/CD pipelines.",
                "Architect and implement Playwright (TypeScript) with Cucumber for comprehensive functional testing.",
                "Built a robust WebdriverIO automation framework from scratch, tailored to project needs.",
                "Drive DevOps practices to optimize test automation, streamline deployment processes, and ensure continuous integration.",
                "Collaborate with Salesforce teams to validate integrations, ensuring seamless CRM functionality."
            ],
            keySkills: ["Playwright","Appium", "WebdriverIO", "Cucumber", "TypeScript", "NodeJS", "Java", "Salesforce", "DevOps"]
        },
        {
            company: 'GovTech Singapore (Contract)',
            logo: '/govtech.png?height=50&width=50',
            position: 'Senior Software Development Engineer Test',
            duration: '06/2020 - 05/2022',
            location: 'Singapore',
            responsibilities: [
                "Developed and maintained backend systems using Spring Batch and Apache Spark for large-scale big data batch processing.",
                "Worked with Angular for front-end development, ensuring seamless integration with backend services.",
                "Managed databases with Oracle and MySQL for efficient data storage and retrieval in enterprise applications.",
                "Extensively utilized Kubernetes and AWS for deploying, scaling, and managing containerized applications, integrating with GitLab CI for continuous delivery.",
                "Implemented automation frameworks using Cucumber, RestAssured, Selenium, Cypress, and WebdriverIO to ensure comprehensive test coverage.",
                "Conducted performance testing to optimize system reliability and scalability under high load."
            ],
            keySkills: ["Spring Batch",
                "Apache Spark",
                "Big Data Batch Processing",
                "Angular",
                "Oracle",
                "MySQL",
                "Kubernetes",
                "AWS",
                "GitLab CI",
                "Cucumber",
                "RestAssured",
                "Selenium",
                "Cypress",
                "WebdriverIO",
                "Performance Testing"]
        },
        {
            company: 'Singtel',
            logo: '/singtel.png?height=50&width=50',
            position: 'Senior Software Engineer',
            duration: '06/2019 - 06/2020',
            location: 'Singapore',
            responsibilities: [
                "Led the automation testing efforts, writing and maintaining test scripts and frameworks for mobile platforms.",
                "Automated tests for Android, iOS, Apple TV, and Android TV using Appium to ensure high-quality releases across all platforms.",
                "Performed extensive API testing to validate backend integrations and enhance the overall product performance.",
                "Explored and evaluated various cloud vendors for mobile test automation, optimizing tool selection for scalability and efficiency.",
                "Managed the setup of an in-house mobile lab, providing a robust testing environment for continuous delivery.",
                "Integrated CI/CD pipelines using GitHub Actions, Jenkins, and Docker to ensure seamless automation testing and deployment processes.",
                "Conducted contract testing to ensure compliance and integration with third-party services."
            ],
            keySkills: ['Java', 'Selenium', 'Microservices', 'Appium', 'REST Assured', 'API Testing', 'CI/CD', 'Jenkins', 'Docker']
        },
        {
            company: 'Telstra (Contract)',
            logo: '/telstra.png?height=50&width=50',
            position: 'Senior Software Engineer',
            duration: '08/2018 - 06/2019',
            location: 'Singapore',
            responsibilities: [
                "Write automation test cases using C#, Java, and JavaScript to ensure comprehensive test coverage across applications.",
                "Implement mobile automation for Android and iOS platforms utilizing the WebdriverIO framework with C# and JavaScript.",
                "Conduct API test automation through the Spring Boot REST API framework, focusing on integration testing.",
                "Perform Xamarin test automation for Android and iOS applications using C# to enhance mobile testing efficiency.",
                "Develop multiple tools using JavaFX and Swing to automate manual tasks, significantly improving team productivity.",
                "Collaborate with the DevOps team to deploy the latest builds to non-production and production environments.",
                "Create and maintain a JavaScript framework with WebdriverIO that is currently in use across the team.",
                "Oversee testing ownership within the team, acting as a Test Lead to guide testing strategies and processes.",
                "Establish and maintain CI/CD pipelines to streamline the development and deployment workflow."
            ],
            keySkills: ["Automation",
                "Mobile",
                "API",
                "Xamarin",
                "C#",
                "Appium",
                "DevOps",
                "JavaScript",
                "CI/CD"]
        },
        {
            company: 'Accenture',
            logo: '/accenture.png?height=50&width=50',
            position: 'Senior Test Automation Engineer',
            duration: '04/2015 - 08/2018',
            location: 'Mumbai,India',
            responsibilities: [
                "Developed and maintained automation scripts using QTP/UFT, Selenium with Java, and RestAssured for comprehensive web, mobile, and API testing.",
                "Designed and implemented scalable automation frameworks, achieving a 50% reduction in manual testing efforts and a 30% increase in overall test coverage.",
                "Led the successful migration from QTP/UFT to Selenium, enhancing script reliability and improving execution speed significantly.",
                "Recognized for expertise in end-to-end QA activities and for mentoring junior team members, fostering a culture of continuous improvement."
            ],
            keySkills: ['Java', 'UIPath', 'BluePrism', 'Test Complete', 'Agile', 'TOSCA','QTP(UFT)', 'Selenium', 'RestAssured','Appium']
        }
    ]

    const recognitionsAndAwards = [
        {
            title: "Employee of the Month",
            organization: "Telstra",
            year: "2018",
            description: "Recognized for outstanding contributions to the team and for consistently delivering high-quality work."
        },
        {
            title: "Monthly Spot Recognition - June 2017",
            organization: "Accenture",
            year: "2017",
            description: "Recognition for exceptional performance in developing and implementing the automation framework."
        },
        {
            title: "Delivery Excellence Award",
            organization: "Accenture",
            year: "2016",
            description: "Awarded for delivering high-quality solutions and exceeding client expectations."
        }
    ]

    const handleDownload = (format: 'pdf' | 'doc') => {
        setDownloadFormat(format);

        // Define margins (in points)
        const marginLeft = 90;
        const marginTop = 50;
        const marginRight = 90;
        const marginBottom = 20;

        if (format === 'pdf') {
            const input = document.getElementById('resume');
            if (input) {
                // Using html2canvas-pro for advanced canvas generation
                html2canvas(input, {
                    scale: 1.3, // Scale the canvas for higher resolution
                    useCORS: true, // Handles cross-origin issues if you have external images/icons
                    scrollX: 0, // Ensure the page scroll doesn't affect rendering
                    scrollY: 0,
                    backgroundColor: "#ffffff", // Keep transparent background if any
                    logging: true, // Enable logging for debugging (can be turned off)
                }).then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF({
                        orientation: 'portrait',
                        unit: 'px',
                        format: [canvas.width, canvas.height],
                    });

                    const pageWidth = pdf.internal.pageSize.getWidth();
                    const pageHeight = pdf.internal.pageSize.getHeight();
                    // Calculate available space after applying margins
                    const usableWidth = pageWidth - marginLeft - marginRight;
                    // const usableHeight = pageHeight - marginTop - marginBottom;

                    // Calculate the aspect ratio of the canvas to fit within the usable space
                    const canvasWidth = canvas.width;
                    const canvasHeight = canvas.height;
                    const ratio = usableWidth / canvasWidth;
                    const scaledHeight = canvasHeight * ratio;

                    pdf.addImage(imgData, 'JPEG', marginLeft, marginTop, usableWidth, scaledHeight);
                    pdf.save('resume.pdf');
                }).catch((error) => {
                    console.error('Error generating canvas:', error);
                });
            }
        }

        // Reset the download format after a short delay
        setTimeout(() => setDownloadFormat(null), 2000);
    };
    return (
        <div className="max-w-7xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-indigo-100 shadow-xl rounded-xl">
            <div className="flex justify-end space-x-4 mb-6">
                <Button
                    onClick={() => handleDownload('pdf')}
                    className="bg-indigo-600 hover:bg-indigo-700"
                    disabled={downloadFormat !== null}
                >
                    <Download className="mr-2 h-4 w-4" />
                    {downloadFormat === 'pdf' ? 'Downloading...' : 'Download PDF'}
                </Button>
            </div>
            <div id="resume" className="flex flex-col md:flex-row gap-8">
                {/* Left Column */}
                <div className="md:w-1/3 space-y-6">
                    <Card className="bg-white/50 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center">
                                <Image
                                    src="/Afsar.png?height=200&width=200"
                                    alt="Afsar Ali"
                                    width={200}
                                    height={200}
                                    className="rounded-full mb-4 border-4 border-indigo-200"
                                />
                                <h1 className="text-2xl font-bold text-center text-indigo-900">Afsar Ali</h1>
                                <h2 className="text-xl text-indigo-600 text-center">Lead QA, PropertyGuru</h2>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/50 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-2 text-indigo-900 flex items-center">
                                <Mail className="w-5 h-5 mr-2 text-indigo-600" />
                                Contact
                            </h3>
                            <div className="space-y-2 text-black">
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-2 text-indigo-600" />
                                    <span className="text-sm">mdafsar.ali273@gmail.com</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2 text-indigo-600" />
                                    <span className="text-sm">+65 94657845</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2 text-indigo-600" />
                                    <span className="text-sm">Singapore</span>
                                </div>
                                <div className="flex items-center">
                                    <Linkedin className="w-4 h-4 mr-2 text-indigo-600" />
                                    <span className="text-sm">linkedin.com/in/afsar-ali-3465a556</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/50 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-2 text-indigo-900 flex items-center">
                                <Award className="w-5 h-5 mr-2 text-indigo-600" />
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="bg-indigo-100 text-black">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/50 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-2 text-indigo-900 flex items-center">
                                <GraduationCap className="w-5 h-5 mr-2 text-indigo-600"/>
                                Education
                            </h3>
                            <h4 className="text-md font-semibold text-black">Master of Science (Computer
                                Science)</h4>
                            <div className="text-sm text-black">Liverpool John Moores University, UK</div>
                            <div className="flex justify-between text-sm text-black">
                                <span>05/2020 - 06/2022</span>
                                {/*<span className="font-semibold">84.3%</span>*/}
                            </div>

                            <h4 className="text-md font-semibold text-black mt-5">Bachelors of Technology </h4>
                            <div className="text-sm text-black">KIIT - Kalinga Institute of Industrial Technology, India</div>
                            <div className="flex justify-between text-sm text-black">
                                <span>05/2010 - 06/2014</span>
                                {/*<span className="font-semibold">84.3%</span>*/}
                            </div>
                        </CardContent>
                    </Card>


                    <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <Award className="w-5 h-5 mr-2"/>
                                Certifications
                            </h3>
                            <div className="space-y-4">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="flex items-center space-x-4">
                                        <Image src={cert.image} alt={cert.name} width={80} height={80} className="rounded-lg" />
                                        <span className="text-sm">{cert.name}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="md:w-2/3 space-y-6">
                    <Card className="bg-white/50 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-bold mb-2 text-indigo-900">Professional Summary</h3>
                            <p className="text-black">
                                Lead SDET with 10 years of QA Automation experience across web, mobile, API, and performance testing. Skilled in building scalable test frameworks, integrating automation in CI/CD pipelines, and mentoring teams. Focused on delivering high-quality software solutions and driving continuous improvement in testing strategies.

                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/50 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-bold mb-4 text-indigo-900 flex items-center">
                                <Briefcase className="w-6 h-6 mr-2 text-indigo-600" />
                                Work Experience
                            </h3>

                            {experiences.map((exp, index) => (
                                <div key={index} className="mb-6 last:mb-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <Image src={exp.logo} alt={exp.company} width={40} height={40} className="mr-4" />
                                            <div>
                                                <h4 className="text-lg font-semibold text-indigo-900">{exp.position}</h4>
                                                <div className="text-black">{exp.company}</div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-black">
                                            {exp.duration} | {exp.location}
                                        </div>
                                    </div>
                                    <ul className="list-disc list-inside space-y-1 text-black mb-2">
                                        {exp.responsibilities.map((resp, idx) => (
                                            <li key={idx}>{resp}</li>
                                        ))}
                                    </ul>
                                    <div className="mt-2">
                                        <h5 className="text-sm font-semibold text-indigo-900 mb-1">Key Skills:</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.keySkills.map((skill, idx) => (
                                                <Badge key={idx} variant="outline" className="bg-indigo-100 text-black border-indigo-300">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-white/50 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-bold mb-4 text-indigo-900 flex items-center">
                                <Trophy className="w-6 h-6 mr-2 text-indigo-600" />
                                Recognition and Awards
                            </h3>

                            {recognitionsAndAwards.map((award, index) => (
                                <div key={index} className="mb-4 last:mb-0">
                                    <h4 className="text-lg font-semibold text-indigo-900">{award.title}</h4>
                                    <div className="text-sm text-black mb-1">
                                        {award.organization} | {award.year}
                                    </div>
                                    <p className="text-black">{award.description}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
