import React from "react";
import { motion } from "framer-motion";
import { Award, FileText, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: "Competence Day Participation",
      issuer: "SMK Telkom Jakarta",
      date: "June 11, 2024",
      description:
        "This certificate is awarded for participating in the Competence Day event held by SMK Telkom Jakarta as a representative in the Graphic Design Center category.",
      pdfLink: "#",
      gradient: "from-cyber-blue to-cyber-purple",
    },
    {
      id: 2,
      title: "JavaScript Essentials 1",
      issuer: "SMK Telkom Sandhy Putra Jakarta • Cisco Networking Academy",
      date: "May 20, 2025",
      description:
        "This certificate is awarded to Bagas Dwi Permana for successfully completing JavaScript Essentials 1 through the Cisco Networking Academy program.",
      pdfLink:
        "/JavaScript_Essentials_1_certificate_bagastelkomschool-gmail-com_fd03c603-9b7f-4389-8cd1-9d2717a6017a.pdf",
      gradient: "from-cyber-purple to-cyber-pink",
    },
    {
      id: 3,
      title: "Build a WordPress Website on Hostinger",
      issuer: "Udemy",
      date: "February 8, 2025",
      description:
        'Certificate of Completion awarded to Bagas Dwi Permana for completing "Build a WordPress Website on Hostinger: Web Design 101".',
      pdfLink: "#",
      gradient: "from-cyber-pink to-cyber-green",
    },
    {
      id: 4,
      title: "Beginners Bootcamp: CSS Coding for Website Development",
      issuer: "Udemy",
      date: "February 8, 2025",
      description:
        'Certificate of Completion awarded to Bagas Dwi Permana for completing the "CSS Coding for Website Development" bootcamp for beginners.',
      pdfLink: "#",
      gradient: "from-cyber-green to-cyber-blue",
    },
    {
      id: 5,
      title: "Guide to Learn SQL with AI",
      issuer: "DQLab",
      date: "October 9, 2024",
      description:
        'This certificate is awarded to Bagas Dwi Permana for completing the "Guide to Learn SQL with AI" program offered by DQLab.',
      pdfLink: "#",
      gradient: "from-cyber-blue to-cyber-pink",
    },
    {
      id: 6,
      title: "Level 3 Competency Test: Web CV with HTML & Bootstrap",
      issuer: "SMK Telkom Sandhy Putra Jakarta",
      date: "December 20, 2024",
      description:
        'Awarded to Bagas Dwi Permana for completing the Level 3 Qualification Competency Test on "Creating a Simple CV Website Using HTML and Bootstrap" on November 25, 2024, and declared Competent.',
      pdfLink: "#",
      gradient: "from-cyber-purple to-cyber-green",
    },
    {
      id: 7,
      title: "CERTIFICATE OF APPRECIATION",
      issuer:
        "Chairperson\nErlangga Dafa Pratama\nHead of Study Program\nInformatics Engineering\nUniversitas Mercu Buana\nDr. Hadi Santoso, S.Kom., M.Kom.\nPrincipal\nSMK Telkom Jakarta",
      date: "January 22, 2025",
      description:
        'Presented to:\nPARTICIPANT\nBagas Dwi Permana\nIn the event of "Training on Building a Simple Website Using Programming Languages HTML, CSS, JavaScript, and PHP" held at SMK Telkom Jakarta.',
      pdfLink: "/Bagas Dwi Permana.pdf",
      gradient: "from-cyber-purple to-cyber-green",
    },
  ];

  const handleViewPdf = (pdfLink, title) => {
    if (pdfLink === "#") {
      toast({
        title: `🚧 URL PDF Belum Disetel!`,
        description: `Harap ganti '#' dengan URL PDF untuk sertifikat "${title}" di kode.`,
        variant: "destructive",
        duration: 5000,
      });
    } else {
      window.open(pdfLink, "_blank");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-purple/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-blue">
              My Certification
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-cyber-purple to-cyber-blue mx-auto mb-8"></div>

          <p className="text-xl text-gray-300 font-space max-w-3xl mx-auto">
            Recognition of expertise and dedication in mastering the latest
            technologies in the world of web development.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid md:grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              className="certification-card rounded-xl overflow-hidden group bg-slate-900/70 backdrop-blur-md border border-slate-800 hover:border-cyber-purple/50 transition-colors duration-300"
            >
              <div className={`p-6 md:p-8 relative`}>
                <div
                  className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${cert.gradient}`}
                ></div>
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white rounded-lg mr-4 shadow-sm">
                    <Award className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-space font-bold text-white group-hover:text-cyber-purple transition-colors">
                    {cert.title}
                  </h3>
                </div>

                <div className="flex items-center text-sm text-gray-400 mb-2 font-space">
                  <CheckCircle className="h-4 w-4 mr-2 text-cyber-green flex-shrink-0" />
                  <span>Issued by: {cert.issuer}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400 mb-4 font-space">
                  <Calendar className="h-4 w-4 mr-2 text-cyber-blue flex-shrink-0" />
                  <span>Date: {cert.date}</span>
                </div>

                <p className="text-gray-300 text-base font-space leading-relaxed mb-6">
                  {cert.description}
                </p>

                <Button
                  onClick={() => handleViewPdf(cert.pdfLink, cert.title)}
                  className="cyber-button bg-cyber-purple/10 hover:bg-cyber-purple/20 border-cyber-purple text-cyber-purple px-6 py-2.5 text-sm font-space font-medium group"
                >
                  View Details
                  <FileText className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
