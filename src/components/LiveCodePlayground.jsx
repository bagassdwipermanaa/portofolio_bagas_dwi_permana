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
    <h1 class="name">Bagas Dwi Permana</h1>
    <p>Full Stack Developer</p>
  </div>
  
  <h2>Skills</h2>
  <div class="skill">HTML & CSS</div>
  <div class="skill">JavaScript</div>
  <div class="skill">React</div>
  <div class="skill">Node.js</div>
  <div class="skill">Python</div>
  <div class="skill">Cloud Computing</div>
</body>
</html>`,
    css: `/* Modern Portfolio Styles */
body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #ffffff;
  min-height: 100vh;
}

.header {
  background: linear-gradient(135deg, #2d2d2d 0%, #404040 100%);
  color: white;
  padding: 40px;
  border-radius: 20px;
  margin: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid #555555;
}

.skill {
  background: linear-gradient(135deg, #333333 0%, #404040 100%);
  padding: 20px;
  margin: 15px 0;
  border-radius: 12px;
  border: 1px solid #555555;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.skill::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.5s;
}

.skill:hover::before {
  left: 100%;
}

.skill:hover {
  background: linear-gradient(135deg, #404040 0%, #555555 100%);
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

h1 { 
  margin: 0 0 15px 0; 
  color: #ffffff; 
  font-size: 2.5em;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

h2 { 
  color: #cccccc; 
  border-bottom: 3px solid #555555; 
  padding-bottom: 15px; 
  font-size: 1.8em;
  margin-top: 30px;
}

.skill-icon {
  font-size: 2em;
  margin-bottom: 10px;
  color: #cccccc;
}`,
    js: `// Interactive Portfolio Demo - Safe Version
class PortfolioDemo {
  constructor() {
    this.init();
  }

  init() {
    this.addTypingEffect();
    this.addSkillProgress();
    this.addClickEffects();
  }

  addTypingEffect() {
    const nameElement = document.querySelector('.name');
    if (!nameElement) return;

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
  }

  addSkillProgress() {
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
        background: linear-gradient(90deg, #00bfff, #0080ff);
        border-radius: 2px;
        width: 0%;
        transition: width 1s ease;
      \`;
      
      progressBar.appendChild(progress);
      skill.appendChild(progressBar);
      
      setTimeout(() => {
        const randomWidth = 70 + Math.random() * 30;
        progress.style.width = randomWidth + '%';
      }, index * 200);
    });
  }

  addClickEffects() {
    document.addEventListener('click', (e) => {
      this.createRipple(e.clientX, e.clientY);
    });
  }

  createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.style.cssText = \`
      position: fixed;
      width: 20px;
      height: 20px;
      background: rgba(0, 191, 255, 0.3);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      animation: ripple 0.6s linear;
      z-index: 1000;
    \`;
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new PortfolioDemo());
} else {
  new PortfolioDemo();
}

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
    const iframe = document.getElementById("output-iframe");
    if (iframe) {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(code.html);
      iframeDoc.write(`<style>${code.css}</style>`);
      iframeDoc.write(`<script>${code.js}</script>`);
      iframeDoc.close();
    }
  };

  const tabs = [
    { id: "html", label: "HTML", icon: "🌐" },
    { id: "css", label: "CSS", icon: "🎨" },
    { id: "js", label: "JavaScript", icon: "⚡" },
  ];

  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Live Code Playground
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience interactive coding with a safe, sandboxed environment.
            This playground demonstrates modern web development techniques.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
        >
          {/* Code Editor */}
          <div className="bg-slate-800 border-b border-slate-700">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-slate-700 text-white border-b-2 border-blue-500"
                      : "text-gray-400 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 h-96">
            {/* Code Display */}
            <div className="bg-slate-900 p-6 overflow-auto">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                <code>{code[activeTab]}</code>
              </pre>
            </div>

            {/* Live Output */}
            <div className="bg-white relative">
              <div className="absolute top-4 right-4 flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <iframe
                id="output-iframe"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
                title="Live Code Output"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm">
            This playground runs in a secure sandbox environment. All code
            execution is isolated and safe.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveCodePlayground;
