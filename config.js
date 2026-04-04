/*
 * config.js
 * Content configuration for the portfolio website.
 * Update this file to change the text, images, and links on the site.
 */

const portfolioData = {
    hero: {
        greeting: "Hello, I'm",
        name: "Soubhagya Das",
        role: "Senior ML Engineering & MLOps Manager",
        bio: `Transforming complex data into actionable <br> intelligence. Specializing in <span>LLM &amp; GenAI Systems</span>, <span>MLOps</span>, <br>and <span>Scalable AI Solutions</span>.`,
        buttons: [
            { text: "Let's Connect", url: "#contact", startIcon: "", endIcon: "fas fa-paper-plane", class: "btn secondary-btn" },
            { text: "Resume", url: "https://drive.google.com/file/d/13mLJ2SnrkPA_M9iW6FgW8vyXmQbiA4Z7/view?usp=sharing", target: "_blank", startIcon: "", endIcon: "fas fa-download", class: "btn primary-btn" }
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
                text: "Senior ML Engineering & MLOps Manager at Axis Bank with 4+ years of experience across Data Science, Cloud Platforms (Azure), Databricks, and GenAI systems. I build production-grade ML and LLM solutions — from Conversational Banking AI platforms to real-time MLOps frameworks — that drive measurable business impact."
            },
            {
                title: "My Mission",
                text: "Driven by the potential of AI and Large Language Models to transform businesses, my goal is to engineer robust, scalable systems — whether it's an LLM Observability Dashboard evaluating 5,000+ daily interactions or a zero-downtime MLOps pipeline — that create tangible, lasting impact."
            }
        ],
        stats: [
            { number: "4+", label: "Years Experience", link: "#experience" },
            { number: "10+", label: "Projects Completed", link: "#projects" },
            { number: "3", label: "Certifications", link: "#certifications" }
        ]
    },
    skills: {
        title: "Technical <span class='accent'>Skills</span>",
        items: [
            {
                type: "hero", // span 2
                icon: "fas fa-robot",
                title: "GenAI &amp; LLMs",
                list: ["LLM Evaluation", "<strong>LLM-as-a-Judge</strong>", "CrewAI", "Prompt Engineering", "Conversational AI", "AI Observability"]
            },
            {
                type: "tall", // row span 2
                icon: "fas fa-cloud",
                title: "Cloud &amp; <br>DevOps",
                list: ["Azure Databricks", "Azure Data Factory", "Azure DevOps", "Docker", "Jenkins", "CI/CD", "Git", "Bitbucket", "REST APIs"]
            },
            {
                type: "standard",
                icon: "fas fa-cogs",
                title: "ML &amp; MLOps",
                text: "Scikit-learn, MLflow, FICO MLx, Feature Engineering, Model Monitoring, Model Governance"
            },
            {
                type: "standard",
                icon: "fas fa-database",
                title: "Data Engineering",
                text: "PySpark, SQL, Databricks, ETL Pipelines, Pandas, NumPy"
            },
            {
                type: "standard",
                icon: "fas fa-users",
                title: "Leadership",
                text: "ML Governance, SOP Authorship, Agile, Stakeholder Mgmt, Team Mentoring"
            }
        ]
    },
    experience: {
        title: "Work <span class='accent'>Experience</span>",
        jobs: [
            {
                role: "Senior Manager (ML Engineering and MLOps)",
                company: "Axis Bank",
                icon: "images/axis_bank.png",
                date: "Jul 2025 – Present | Bengaluru, India",
                details: [
                    "Built an end-to-end <strong>Conversational Banking AI</strong> platform for Call Centre Automation comprising an <strong>LLM Observability Dashboard</strong> and a near-real-time analytics pipeline: the dashboard evaluates 5,000+ daily customer interactions using LLM-as-a-Judge metrics (relevance, faithfulness, intent-level SSR) powered by Gemini, GPT, and CrewAI; the pipeline processes conversation data through PySpark into cube tables, reducing manual monitoring effort by 60% and surfacing live metrics for business stakeholders.",
                    "Led ML productionization on <strong>FICO MLx</strong> end-to-end: designed a config-driven folder structure and reusable deployment templates, authored a comprehensive SOP adopted across teams, and navigated multi-stage governance workflows including BRD reviews and AOPM sign-offs to achieve production certification, reducing cross-team onboarding effort by 40–50%.",
                    "Automated CI/CD pipelines using <strong>Jenkins</strong> and Bitbucket, compressing release cycles to under 2 hours; designed and executed bulk REST API testing scenarios covering extensive edge cases in UAT alongside schema validation and bulk inference, achieving a 100% pass rate across all model deployments."
                ],
                stats: [
                    { icon: "fas fa-robot", text: "5,000+ Daily Interactions" },
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
                date: "Jul 2023 – Jan 2025 | Bengaluru, India",
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
                date: "Jul 2022 – Jul 2023 | Bengaluru, India",
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
                date: "Jan 2022 – Jul 2022 | Bengaluru, India",
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
                title: "Conversational Banking AI Dashboard",
                tech: "LLM-as-a-Judge, Gemini, GPT, CrewAI, PySpark, Call Centre AI",
                desc: "Built an end-to-end LLM Observability Dashboard and near-real-time analytics pipeline for Axis Bank's Call Centre Automation. Evaluates 5,000+ daily customer interactions using LLM-as-a-Judge metrics (relevance, faithfulness, intent-level SSR); PySpark pipeline feeds live cube tables for business stakeholders.",
                stats: [
                    { icon: "fas fa-robot", text: "5,000+ Daily Interactions" },
                    { icon: "fas fa-chart-bar", text: "60% Less Manual Monitoring" }
                ]
            },
            {
                title: "Real-Time MLOps Framework",
                tech: "FICO MLx, Jenkins, Python, Docker, Bitbucket",
                desc: "Designed and implemented a scalable MLOps architecture for Axis Bank to enable real-time model serving and automated lifecycle management.",
                stats: [
                    { icon: "fas fa-rocket", text: "Sub-2hr Release Cycles" },
                    { icon: "fas fa-check-circle", text: "100% API Pass Rate" }
                ]
            },
            {
                title: "MLCore — ML Lifecycle Platform",
                tech: "Azure Databricks, Azure DevOps, MLflow, PySpark, Python",
                desc: "Built an end-to-end governed ML platform at Tiger Analytics covering data ingestion, feature engineering, model training, versioning, deployment, and compliance tracking. Delivered across 5+ financial services client engagements.",
                stats: [
                    { icon: "fas fa-tachometer-alt", text: "70% Efficiency Boost" },
                    { icon: "fas fa-shield-alt", text: "Full Model Governance" }
                ]
            },
            {
                title: "Unet Image Segmentation",
                tech: "Deep Learning, Python, Computer Vision, ONNX",
                desc: "Developed a Unet architecture model for precise image segmentation, enabling advanced visual insights and better decision-making processes.",
                stats: [
                    { icon: "fas fa-brain", text: "Deep Learning Model" },
                    { icon: "fas fa-eye", text: "Precise Segmentation" }
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
