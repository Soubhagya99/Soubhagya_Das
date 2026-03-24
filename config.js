/*
 * config.js
 * Content configuration for the portfolio website.
 * Update this file to change the text, images, and links on the site.
 */

const portfolioData = {
    hero: {
        greeting: "Hello, I'm",
        name: "Soubhagya Das",
        role: "Machine Learning Engineer",
        bio: `Transforming complex data into actionable <br> intelligence. Specializing in <span>MLOps</span>, <span>Cloud <br> Architecture</span>, and <span>Scalable AI Solutions</span>.`,
        buttons: [
            { text: "Let's Connect", url: "#contact", startIcon: "", endIcon: "fas fa-paper-plane", class: "btn secondary-btn" },
            { text: "Resume", url: "https://drive.google.com/file/d/1ixrz0r0iD8DVVgpQ2Ol_juAiuAObKyPg/view?usp=drive_link", target: "_blank", startIcon: "", endIcon: "fas fa-download", class: "btn primary-btn" }
        ],
        socialLinks: [
            { icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/soubhagya-das/", target: "_blank" },
            { icon: "fas fa-envelope", url: "mailto:soubhagya99.das@gmail.com", target: "" },
            { icon: "fab fa-github", url: "https://github.com/Soubhagya99", target: "_blank" }
        ],
        image: "images/profile.png"
    },
    about: {
        title: "About <span class='accent'>Me</span>",
        descriptionButtons: [
            // keeping the card structure in data might be too complex, simplified to sections
        ],
        cards: [
            {
                title: "Transforming Data into Value",
                text: "I am a highly motivated Machine Learning Engineer with strong expertise in Data Science, Cloud Platforms (Azure), and Databricks. I leverage my skills to drive data-driven decision-making and develop innovative solutions that tackle real-world challenges."
            },
            {
                title: "My Mission",
                text: "Driven by the potential of AI to transform businesses, my goal is to build robust, scalable ML systems that create tangible impact."
            }
        ],
        stats: [
            { number: "3+", label: "Years Experience", link: "#experience" },
            { number: "10+", label: "Projects Completed", link: "#projects" },
            { number: "3", label: "Certifications", link: "#certifications" }
        ]
    },
    skills: {
        title: "Technical <span class='accent'>Skills</span>",
        items: [
            {
                type: "hero", // span 2
                icon: "fas fa-code",
                title: "Languages",
                list: ["Python", "SQL", "<strong>Spark (PySpark)</strong>", "Java"]
            },
            {
                type: "tall", // row span 2
                icon: "fas fa-tools",
                title: "Tools & <br>Cloud",
                list: ["Azure DF", "Databricks", "MLflow", "Docker", "Git", "Jenkins"]
            },
            {
                type: "standard",
                icon: "fas fa-brain",
                title: "Libraries",
                text: "Pandas, NumPy, Scikit-learn, TensorFlow, Keras"
            },
            {
                type: "standard",
                icon: "fas fa-users",
                title: "Leadership",
                text: "Agile, Team Mentoring, Stakeholder Mgmt"
            }
        ]
    },
    experience: {
        title: "Work <span class='accent'>Experience</span>",
        jobs: [
            {
                role: "Senior Manager - MLOps",
                company: "Axis Bank",
                icon: "images/axis_bank.png",
                date: "Jul 2025 – Present · 8 mos | Bengaluru, India",
                details: [
                    "<strong>Project:</strong> Real-Time Model Deployment | FICO MLx | Jenkins | MLOps Automation",
                    "Led the real-time deployment of ML models on the FICO MLx platform, powering faster data-driven decisions across retail and credit-risk journeys.",
                    "Architected a standardized deployment framework to support multiple model types and business workflows, reducing onboarding time by 40%.",
                    "Built and automated CI/CD pipelines using Jenkins, integrating model validation, versioning, and monitoring — cutting deployment time by 60% and improving release reliability.",
                    "Defined and enforced MLOps governance policies for version control, rollback, and audit traceability, enhancing compliance and consistency across teams.",
                    "Collaborated with data science, DevOps, and business units to embed ML pipelines seamlessly within enterprise analytics infrastructure."
                ],
                stats: [
                    { icon: "fas fa-chart-line", text: "25% Efficiency Boost" },
                    { icon: "fas fa-cogs", text: "60% Less Manual Ops" }
                ]
            },
            {
                role: "Machine Learning Engineer",
                company: "Tiger Analytics",
                icon: "images/Tiger-Analytics_Logo.png",
                date: "Jan 2025 – Jul 2025 · 7 mos | Bengaluru, India",
                details: [
                    "Developed MLCore, an end-to-end platform for real-time data updates, boosting processing efficiency by 70% and reducing downtime by 30% and errors by 25%.",
                    "Introduced income logic for user categorization, ensuring efficient data flow for enhanced segmentation, leading to a 50% increase in targeted strategy effectiveness."
                ],
                stats: [
                    { icon: "fas fa-tachometer-alt", text: "70% Efficiency Boost" },
                    { icon: "fas fa-bullseye", text: "50% Better Targeting" }
                ]
            },
            {
                role: "Senior Analyst",
                company: "Tiger Analytics",
                icon: "images/Tiger-Analytics_Logo.png",
                date: "Jul 2023 – Jan 2025 · 1 yr 7 mos | Bengaluru, India",
                details: [
                    "Implemented a robust logging system for an insurance project, enhancing traceability and reducing manual debugging efforts by 40%, leading to a 15% faster resolution time.",
                    "Collaborated with cross-functional teams to identify areas of improvement, leading to a 30% increase in operational effectiveness.",
                    "Mentored junior analysts, fostering professional development and enhancing overall team performance."
                ],
                stats: [
                    { icon: "fas fa-bug", text: "40% Less Debugging" },
                    { icon: "fas fa-chart-line", text: "30% Ops Improvement" }
                ]
            },
            {
                role: "Analyst",
                company: "Tiger Analytics",
                icon: "images/Tiger-Analytics_Logo.png",
                date: "Jul 2022 – Jul 2023 · 1 yr 1 mo | Bengaluru, India",
                details: [
                    "Analyzed and optimized key operational drivers using Azure-integrated Databricks, reducing cloud resource costs by 20% and increasing processing speed by 15%.",
                    "Streamlined model deployment across diverse environments using ONNX, cutting deployment time by 40% and reducing errors by 20%.",
                    "Led the development and implementation of the Unet model for image segmentation, enhancing data insights and decision making."
                ],
                stats: [
                    { icon: "fas fa-cloud", text: "20% Cost Reduction" },
                    { icon: "fas fa-rocket", text: "40% Faster Deploys" }
                ]
            },
            {
                role: "Data Science Intern",
                company: "Tiger Analytics",
                icon: "images/Tiger-Analytics_Logo.png",
                date: "Jan 2022 – Jul 2022 · 7 mos | Bengaluru, India",
                details: [
                    "Implemented machine learning algorithms to analyze large datasets, resulting in improved data accuracy and efficiency.",
                    "Collaborated with cross-functional teams to interpret data and provide actionable insights, contributing to strategic decision-making for the organization.",
                    "Predicted the sales price for each house using ML. Used Python and Jupyter Notebook along with various libraries like Pandas, NumPy, Scikit-learn, etc. Minimized RMSE value using various ML models."
                ],
                stats: [
                    { icon: "fas fa-check-circle", text: "Minimized RMSE" },
                    { icon: "fas fa-database", text: "High Data Accuracy" }
                ]
            }
        ]
    },
    projects: {
        title: "Featured <span class='accent'>Projects</span>",
        items: [
            {
                title: "Real-Time MLOps Framework",
                tech: "FICO MLx | Jenkins | Python | Docker",
                desc: "Designed and implemented a scalable MLOps architecture for Axis Bank to enable real-time model serving and automated lifecycle management.",
            },
            {
                title: "Demand Forecasting Engine",
                tech: "Azure Databricks | PySpark | Prophet | ADF",
                desc: "End-to-end forecasting solution processing terabytes of sales data to predict demand for thousands of products with high accuracy.",
            },
            {
                title: "Unet Image Segmentation",
                tech: "Deep Learning | Python | Computer Vision",
                desc: "Developed a Unet architecture model for precise image segmentation, enabling advanced visual insights and better decision-making processes.",
            },
            {
                title: "Customer Segmentation",
                tech: "Azure Databricks | PySpark | Clustering",
                desc: "Built a segmentation model to improve marketing strategies. Automated data pipelines and model training processes, reducing manual workload.",
                stats: [
                    { icon: "fas fa-bullseye", text: "30% Better Targeting" }
                ]
            }
        ]
    },
    education: {
        title: "My <span class='accent'>Education</span>",
        items: [
            {
                institution: "International Institute of Information Technology, Bhubaneswar, India",
                degree: "Bachelor of Technology in Electrical Telecommunication",
                date: "Graduated: 2022",
                icon: "images/IIIT_Bhubaneswar_Logo.png"
            }
        ]
    },
    certifications: {
        title: "My <span class='accent'>Certifications</span>",
        items: [
            {
                title: "Databricks Certified ML Professional",
                date: "Mar 2025 – Mar 2027",
                verifyLink: "https://credentials.databricks.com/f035965c-90e5-4e9a-9ab0-2490973d79dc",
                icon: "images/databricks.png"
            },
            {
                title: "Databricks Certified ML Associate",
                date: "Jul 2024 – Jul 2026",
                verifyLink: "https://credentials.databricks.com/89c141fb-4092-457e-8974-26a11635eba4",
                icon: "images/databricks.png"
            },
            {
                title: "Tiger Analytics Certified Analytics Associate",
                date: "Issued: September 2022",
                verifyLink: "https://portal.itscredible.com/qr/905326715119",
                icon: "images/ta.png"
            }

        ]
    },
    contact: {
        title: "Get In <span class='accent'>Touch</span>",
        formAction: "https://formspree.io/f/xgvwzwpz",
        email: "soubhagya99.das@gmail.com",
        linkedin: "https://linkedin.com/in/soubhagya-das",
        copyright: "&copy; 2026 Soubhagya Das. Built with <i class='fas fa-heart accent'></i> and <i class='fas fa-coffee'></i>."
    }
};
