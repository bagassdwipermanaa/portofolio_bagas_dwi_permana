import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LiveCodePlayground = () => {
  const [activeTab, setActiveTab] = useState("html");
  const [code, setCode] = useState({
    html: `<!DOCTYPE html>
<html>
<head>
  <title>My Portfolio</title>
  <style>
    body { 
      font-family: 'Segoe UI', Arial, sans-serif; 
      margin: 0; 
      padding: 40px; 
      background: #1a1a1a; 
      color: #ffffff; 
    }
    .header { 
      background: #2d2d2d; 
      color: white; 
      padding: 30px; 
      border-radius: 15px; 
      margin-bottom: 30px;
      border: 1px solid #404040;
    }
    .skill { 
      background: #333333; 
      padding: 15px; 
      margin: 10px 0; 
      border-radius: 8px; 
      border: 1px solid #404040;
      transition: all 0.3s ease;
    }
    .skill:hover {
      background: #404040;
      transform: translateY(-2px);
    }
    h1 { margin: 0 0 10px 0; color: #ffffff; }
    h2 { color: #cccccc; border-bottom: 2px solid #404040; padding-bottom: 10px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Bagas Dwi Permana</h1>
    <p>Full Stack Developer</p>
  </div>
  
  <h2>Skills</h2>
  <div class="skill">HTML & CSS</div>
  <div class="skill">JavaScript</div>
  <div class="skill">React</div>
  <div class="skill">Node.js</div>
  
  <h2>About Me</h2>
  <p>Passionate developer with experience in building modern web applications.</p>
</body>
</html>`,
    css: `body {
   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
   margin: 0;
   padding: 20px;
   background: #0f0f0f;
   min-height: 100vh;
   color: #ffffff;
 }

 .container {
   max-width: 800px;
   margin: 0 auto;
   background: #1a1a1a;
   border-radius: 15px;
   padding: 30px;
   border: 1px solid #333333;
 }

 .header {
   text-align: center;
   margin-bottom: 40px;
   background: #2d2d2d;
   padding: 30px;
   border-radius: 15px;
   border: 1px solid #404040;
 }

 .name {
   font-size: 3em;
   font-weight: bold;
   margin: 0;
   color: #ffffff;
   text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
 }

 .title {
   font-size: 1.5em;
   color: #cccccc;
   margin: 10px 0;
 }

 .skills {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
   gap: 20px;
   margin: 30px 0;
 }

 .skill {
   background: #333333;
   padding: 20px;
   border-radius: 12px;
   text-align: center;
   transition: all 0.3s ease;
   border: 1px solid #404040;
 }

 .skill:hover {
   transform: translateY(-3px);
   background: #404040;
   box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
 }

 .skill-icon {
   font-size: 2em;
   margin-bottom: 10px;
   color: #cccccc;
 }`,
    js: `// Interactive Portfolio Demo
document.addEventListener('DOMContentLoaded', function() {
  // Add typing effect to name
  const nameElement = document.querySelector('.name');
  const originalText = nameElement.textContent;
  nameElement.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < originalText.length) {
      nameElement.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  setTimeout(typeWriter, 500);
  
  // Add skill progress bars
  const skills = document.querySelectorAll('.skill');
  skills.forEach((skill, index) => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = \`
      width: 100%;
      height: 4px;
      background: #333333;
      border-radius: 2px;
      margin-top: 10px;
      overflow: hidden;
    \`;
    
    const progress = document.createElement('div');
    progress.style.cssText = \`
      height: 100%;
      background: #ffffff;
      border-radius: 2px;
      width: 0%;
      transition: width 1s ease;
    \`;
    
    progressBar.appendChild(progress);
    skill.appendChild(progressBar);
    
    // Animate progress bar
    setTimeout(() => {
      progress.style.width = (70 + Math.random() * 30) + '%';
    }, index * 200);
  });
  
  // Add click effects
  document.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.style.cssText = \`
      position: fixed;
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      animation: ripple 0.6s linear;
    \`;
    
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = \`
  @keyframes ripple {
    to {
      transform: translate(-50%, -50%) scale(20);
      opacity: 0;
    }
  }
\`;
document.head.appendChild(style);`,
  });

  const [output, setOutput] = useState("");

  useEffect(() => {
    updateOutput();
  }, [code]);

  const updateOutput = () => {
    const htmlContent = code.html;
    const cssContent = code.css;
    const jsContent = code.js;

    const fullHTML = htmlContent
      .replace("</head>", `<style>${cssContent}</style></head>`)
      .replace("</body>", `<script>${jsContent}</script></body>`);

    setOutput(fullHTML);
  };

  const handleCodeChange = (language, value) => {
    setCode((prev) => ({
      ...prev,
      [language]: value,
    }));
  };

  const runCode = () => {
    updateOutput();
  };

  const resetCode = () => {
    setCode({
      html: `<!DOCTYPE html>
<html>
<head>
  <title>My Portfolio</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Start coding here...</p>
</body>
</html>`,
      css: `body {
  font-family: Arial, sans-serif;
  margin: 40px;
  background: #1a1a1a;
  color: #ffffff;
}`,
      js: `// Your JavaScript code here
console.log('Hello from JavaScript!');`,
    });
  };

  const tabs = [
    { id: "html", name: "HTML", icon: "🔷" },
    { id: "css", name: "CSS", icon: "🎨" },
    { id: "js", name: "JavaScript", icon: "⚡" },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Live Code Playground
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Coba dan eksperimen dengan kode secara langsung. Lihat hasilnya
            secara real-time!
          </p>
        </motion.div>

        {/* Playground Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden"
        >
          {/* Toolbar */}
          <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-600/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold text-white">
                  Code Editor
                </h3>
                <div className="flex gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-slate-600 text-white"
                          : "bg-slate-600/50 text-gray-300 hover:bg-slate-600"
                      }`}
                    >
                      {tab.icon} {tab.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={runCode}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  ▶️ Run Code
                </button>
                <button
                  onClick={resetCode}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px]">
            {/* Code Editor */}
            <div className="bg-slate-900 p-6">
              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">
                  {tabs.find((tab) => tab.id === activeTab)?.name} Code
                </h4>
              </div>
              <textarea
                value={code[activeTab]}
                onChange={(e) => handleCodeChange(activeTab, e.target.value)}
                className="w-full h-[500px] bg-slate-800 text-gray-200 p-4 rounded-lg border border-slate-600/50 font-mono text-sm resize-none focus:outline-none focus:border-slate-500/50"
                placeholder={`Enter your ${activeTab.toUpperCase()} code here...`}
              />
            </div>

            {/* Output Preview */}
            <div className="bg-white p-6">
              <div className="mb-4">
                <h4 className="text-gray-800 font-medium mb-2">Live Preview</h4>
              </div>
              <div className="border border-gray-200 rounded-lg h-[500px] overflow-auto">
                <iframe
                  srcDoc={output}
                  title="Code Output"
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-slate-700/30">
            <div className="text-3xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-white mb-2">Tips & Tricks</h3>
            <p className="text-gray-400 text-sm">
              Gunakan playground ini untuk eksperimen dengan HTML, CSS, dan
              JavaScript. Lihat perubahan secara real-time!
            </p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-slate-700/30">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2">Learning</h3>
            <p className="text-gray-400 text-sm">
              Coba ubah warna, tambah animasi, atau buat layout baru. Ini adalah
              cara terbaik untuk belajar coding!
            </p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-slate-700/30">
            <div className="text-3xl mb-4">🔧</div>
            <h3 className="text-xl font-bold text-white mb-2">Customize</h3>
            <p className="text-gray-400 text-sm">
              Sesuaikan kode sesuai kebutuhan. Semua perubahan akan langsung
              terlihat di preview!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveCodePlayground;
