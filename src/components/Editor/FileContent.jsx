import { Linkedin, Github, Mail } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

const highlightOutsideTags = (content, regex, className) =>
  content
    .split(/(<[^>]+>)/g)
    .map(part => (part.startsWith('<') ? part : part.replace(regex, `<span class="${className}">$1</span>`)))
    .join('');

const CodeLine = ({ num, content }) => (
  <div className="flex hover:bg-[#2a2d2e] group">
    <div className="w-12 text-[#858585] text-right pr-4 select-none group-hover:text-[#c6c6c6]">{num}</div>
    <div className="whitespace-pre font-mono text-[#d4d4d4] flex-1" dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

const FileContent = ({ activeFile }) => {
  if (activeFile === 'readme') {
    return (
      <div className="p-8 max-w-4xl mx-auto overflow-auto h-full font-sans text-[#d4d4d4]">
        <h1 className="text-4xl font-bold mb-2 pb-2 border-b border-[#3e3e42]">{resumeData.name}</h1>
        <h2 className="text-xl text-[#007acc] mb-6">{resumeData.role}</h2>
        <p className="mb-8 leading-relaxed whitespace-pre-line">{resumeData.summary}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
                <h3 className="text-xl font-bold mb-4 pb-1 border-b border-[#3e3e42] text-[#ce9178]">Certifications</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">{resumeData.certifications.map((c,i) => <li key={i}>{c}</li>)}</ul>
            </div>
            <div>
                <h3 className="text-xl font-bold mb-4 pb-1 border-b border-[#3e3e42] text-[#ce9178]">Honors & Awards</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-yellow-200">{resumeData.awards.map((a,i) => <li key={i}>{a}</li>)}</ul>
            </div>
        </div>

        <h3 className="text-xl font-bold mb-4 pb-1 border-b border-[#3e3e42] text-[#4ec9b0]">Publications</h3>
        <ul className="list-disc pl-5 space-y-2 mb-8 text-sm">{resumeData.publications.map((p,i) => <li key={i}>{p}</li>)}</ul>

        <div className="mt-8 p-4 bg-[#252526] rounded border border-[#3e3e42]">
            <h4 className="font-bold text-[#ce9178] mb-2">Quick Links</h4>
            <div className="flex flex-wrap gap-4">
                <a href={`https://${resumeData.social.linkedin}`} target="_blank" rel="noreferrer" className="text-[#569cd6] hover:underline flex items-center gap-2"><Linkedin size={16}/> LinkedIn</a>
                <a href={`https://${resumeData.social.github}`} target="_blank" rel="noreferrer" className="text-[#569cd6] hover:underline flex items-center gap-2"><Github size={16}/> GitHub</a>
                <a href={`mailto:${resumeData.social.email}`} className="text-[#569cd6] hover:underline flex items-center gap-2"><Mail size={16}/> Email</a>
            </div>
        </div>
      </div>
    );
  }

  let rawContent = "";
  if (activeFile === 'experience') {
    const json = JSON.stringify(resumeData.experience, null, 4);
    rawContent = json
      .replace(/"([^"]+)":/g, '<span class="syntax-variable">"$1"</span>:')
      .replace(/: "([^"]*)"/g, ': <span class="syntax-string">"$1"</span>');
  } else if (activeFile === 'skills') {
    const skillsList = resumeData.skills.map(s => `    "${s}"`).join(',\n');
    const ts = `import { Developer } from 'evoney-mendonca';\n\nconst myStack: string[] = [\n${skillsList}\n];\n\nexport function getExpertise() {\n    return {\n        cloud: ["AWS", "Terraform"],\n        backend: ["Node.js", "Python"],\n        frontend: ["Angular", "React"]\n    };\n}\n\nconsole.log("Ready to deploy!");`;
    rawContent = ts
      .replace(/"(?:[^"\\]|\\.)*"/g, m => `<span class="syntax-string">${m}</span>`)
      .replace(/'(?:[^'\\]|\\.)*'/g, m => `<span class="syntax-string">${m}</span>`);

    rawContent = highlightOutsideTags(rawContent, /\b(import|from|export|function|return|const)\b/g, 'syntax-keyword');
    rawContent = highlightOutsideTags(rawContent, /\b(console|log)\b/g, 'syntax-function');
  } else if (activeFile === 'snippets') {
    const snippetsText = resumeData.snippets.map(snippet => {
      const header = `// ${snippet.title}\n// file: ${snippet.file}`;
      return `${header}\n${snippet.code.trim()}`;
    }).join('\n\n');

    rawContent = snippetsText
      .replace(/"(?:[^"\\]|\\.)*"/g, '<span class="syntax-string">$&</span>')
      .replace(/'(?:[^'\\]|\\.)*'/g, '<span class="syntax-string">$&</span>');

    rawContent = rawContent.replace(/(^\s*)(\/\/.*)$/gm, (_, spaces, comment) => `${spaces}<span class="syntax-comment">${comment}</span>`);
    rawContent = rawContent.replace(/(^\s*)(#.*)$/gm, (_, spaces, comment) => `${spaces}<span class="syntax-comment">${comment}</span>`);
    rawContent = highlightOutsideTags(rawContent, /(version|services|image|command|container_name|export|const)/g, 'syntax-keyword');
  } else if (activeFile === 'education') {
    const eduItems = resumeData.education.map(e => `    {\n        "institution": "${e.inst}",\n        "course": "${e.course}",\n        "period": "${e.period}"\n    }`).join(',\n');
    const py = `class Education:\n    def __init__(self):\n        self.academic_history = [\n${eduItems}\n        ]\n\n    def print_status(self):\n        for edu in self.academic_history:\n            print(f"Graduated from {edu['institution']}")\n\nif __name__ == "__main__":\n    me = Education()\n    me.print_status()`;
    rawContent = py.replace(/"(?:[^"\\]|\\.)*"/g, '<span class="syntax-string">$&</span>');
    rawContent = highlightOutsideTags(
      rawContent,
      /(__name__|\bclass\b|\bdef\b|\bself\b|\bif\b|\breturn\b|\bfor\b|\bin\b)/g,
      'syntax-keyword'
    );
    rawContent = highlightOutsideTags(rawContent, /\bprint\b/g, 'syntax-function');
  } else if (activeFile === 'contact') {
    const css = `.contact-card {\n    display: flex;\n    justify-content: center;\n}\n\n#email {\n    content: "${resumeData.social.email}";\n    cursor: pointer;\n}\n\n/* Contact me for DevOps roles! */`;
    rawContent = css
    .replace(/"(?:[^"\\]|\\.)*"/g, '<span class="syntax-string">$&</span>') // string values
    .replace(/\.([a-zA-Z-]+) /g, '<span class="syntax-function">.$1 </span>') // classes
    .replace(/#([a-zA-Z-]+)/g, '<span class="syntax-variable">#$1</span>') // ids
    .replace(/\/\*([\s\S]*?)\*\//g, '<span class="syntax-comment">/*$1*/</span>'); // comments
  }

  return (
    <div className="p-4 overflow-auto h-full font-mono text-sm">
      {rawContent.split('\n').map((line, i) => <CodeLine key={i} num={i + 1} content={line} />)}
    </div>
  );
};

export default FileContent;
