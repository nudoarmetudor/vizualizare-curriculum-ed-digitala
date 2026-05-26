const { useState, useEffect, useMemo } = React;

const Icon = ({ name, className }) => (
    <span className={`material-icons ${className}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {name}
    </span>
);

const THREADS = {
  "cautare": {
    label: "Căutare & Cercetare Informațională",
    color: "from-blue-500 to-cyan-500",
    bgClass: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "search",
    desc: "Evoluția de la navigarea asistată și căutarea de imagini simple la cercetare științifică, baze de date globale și management bibliografic automat."
  },
  "creatie": {
    label: "Creare de Conținut, Design & Media",
    color: "from-purple-500 to-pink-500",
    bgClass: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "videocam",
    desc: "Tranziția de la desene elementare în Paint la documente hibride, machete interactive, editare video cinematografică și optimizare vizuală pe straturi."
  },
  "siguranta": {
    label: "Gândire Critică, Fact-Checking & Securitate",
    color: "from-rose-500 to-orange-500",
    bgClass: "bg-rose-50 text-rose-700 border-rose-200",
    icon: "verified_user",
    desc: "De la igiena digitală de bază (parole, reguli de ecran) la detectarea manipulărilor algoritmice, fact-checking avansat, metadate și combaterea Deepfake."
  },
  "colaborare": {
    label: "Colaborare Online & Proiecte Comunitare",
    color: "from-emerald-500 to-teal-500",
    bgClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: "group",
    desc: "Progresul de la lucrul simplu pe documente partajate la coordonarea complexă de proiecte cu roluri definite, pitch-uri sociale și soluții de impact real."
  },
  "algoritmi": {
    label: "Algoritmi, Automatizare & Inteligență Artificială",
    color: "from-amber-500 to-yellow-600",
    bgClass: "bg-amber-50 text-amber-700 border-amber-200",
    icon: "memory",
    desc: "Parcursul de la logică algoritmică unplugged la utilizarea critică a AI, ingineria prompturilor, automatizarea fluxurilor de lucru și evaluarea etică a algoritmilor."
  }
};

function App() {
  const [curriculum, setCurriculum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [activeTab, setActiveTab] = useState('spiral');
  const [selectedClass, setSelectedClass] = useState('1');
  const [selectedThread, setSelectedThread] = useState('cautare');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [editingScenario, setEditingScenario] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newScenario, setNewScenario] = useState({
    id: 'S1', titlu: '', nivel: 'Dezvoltare', cs: ['CS1'], uc: [],
    actiune: '', produs: '', note: '', thread: 'creatie', lectii: ['', '', '', '']
  });

  // AICI este noua logică de extragere a datelor din data.json
  useEffect(() => {
    const saved = localStorage.getItem('smart_curriculum_data');
    if (saved) {
      setCurriculum(JSON.parse(saved));
      setIsLoading(false);
    } else {
      fetch('./data.json')
        .then(response => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then(data => {
          setCurriculum(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Eroare la încărcarea datelor din data.json:", error);
          setFetchError("Nu am putut încărca baza de date. Asigură-te că fișierul data.json există pe GitHub.");
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (curriculum) {
      localStorage.setItem('smart_curriculum_data', JSON.stringify(curriculum));
    }
  }, [curriculum]);

  const handleResetData = () => {
    if (window.confirm("Sigur doriți să resetați modificările locale la valorile implicite din data.json?")) {
      setIsLoading(true);
      fetch('./data.json')
        .then(res => res.json())
        .then(data => {
          setCurriculum(data);
          localStorage.removeItem('smart_curriculum_data');
          setIsLoading(false);
        });
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(curriculum, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "Curriculum_Educație_Digitală_Personalizat.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed["1"] && parsed["1"].scenarii) {
          setCurriculum(parsed);
          // Fără alert, schimbăm doar UI-ul vizual dacă vrei, sau lăsăm silențios
        }
      } catch (err) {
        console.error("Eroare la citirea fișierului.");
      }
    };
  };

  const handleUpdateScenario = (clasaId, index, updatedScenariu) => {
    setCurriculum(prev => {
      const copy = { ...prev };
      copy[clasaId].scenarii[index] = updatedScenariu;
      return copy;
    });
    setEditingScenario(null);
  };

  const handleAddScenario = (clasaId) => {
    setCurriculum(prev => {
      const copy = { ...prev };
      copy[clasaId].scenarii.push({
        ...newScenario,
        lectii: newScenario.lectii.filter(l => l.trim() !== '')
      });
      return copy;
    });
    setShowAddModal(false);
    setNewScenario({
      id: 'S1', titlu: '', nivel: 'Dezvoltare', cs: ['CS1'], uc: [],
      actiune: '', produs: '', note: '', thread: 'creatie', lectii: ['', '', '', '']
    });
  };

  const handleDeleteScenario = (clasaId, index) => {
    if (window.confirm("Sigur doriți să ștergeți acest scenariu din curriculum?")) {
      setCurriculum(prev => {
        const copy = { ...prev };
        copy[clasaId].scenarii.splice(index, 1);
        return copy;
      });
    }
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !curriculum) return [];
    const results = [];
    const query = searchQuery.toLowerCase();
    Object.entries(curriculum).forEach(([clasaId, data]) => {
      data.scenarii.forEach((sc, idx) => {
        const matchTitlu = sc.titlu.toLowerCase().includes(query);
        const matchProdus = sc.produs.toLowerCase().includes(query);
        const matchLectii = sc.lectii.some(l => l.toLowerCase().includes(query));
        const matchNotes = sc.note.toLowerCase().includes(query);
        if (matchTitlu || matchProdus || matchLectii || matchNotes) {
          results.push({ clasaId, scenariu: sc, index: idx });
        }
      });
    });
    return results;
  }, [curriculum, searchQuery]);

  const competenciesMapping = useMemo(() => {
    const map = {
      CS1: { title: "Explorare și Gândire Critică", desc: "Identificarea echipamentelor, căutarea, evaluarea critică a informațiilor și gestionarea resurselor digitale.", items: [] },
      CS2: { title: "Proces Tehnologic și Gândire Computațională", desc: "Planificarea salvării datelor, rezolvarea de probleme, algoritmi, programare și utilizarea responsabilă a tehnologiilor.", items: [] },
      CS3: { title: "Utilizare Creativă și Colaborare", desc: "Crearea de documente, imagini, clipuri video, campanii media, colaborarea în echipă și rezolvarea de probleme comunitare.", items: [] }
    };
    if(!curriculum) return map;

    Object.entries(curriculum).forEach(([clasaId, data]) => {
      data.scenarii.forEach((sc, idx) => {
        sc.cs.forEach(csKey => {
          if (map[csKey]) {
            map[csKey].items.push({ clasaId, scenariu: sc, index: idx });
          }
        });
      });
    });
    return map;
  }, [curriculum]);

  const spiralNodes = useMemo(() => {
    const nodes = [];
    if(!curriculum) return nodes;

    const sortedClasses = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    sortedClasses.forEach((clasaId) => {
      const matchScenarii = curriculum[clasaId]?.scenarii.filter(sc => sc.thread === selectedThread) || [];
      matchScenarii.forEach((sc, idx) => {
        nodes.push({
          clasaId,
          scenariu: sc,
          index: curriculum[clasaId].scenarii.indexOf(sc),
          nivelClasa: curriculum[clasaId].nivel
        });
      });
    });
    return nodes;
  }, [curriculum, selectedThread]);


  // Ecrane de Loading / Eroare
  if (fetchError) {
      return (
          <div className="min-h-screen bg-slate-900 flex items-center justify-center text-red-400 p-8 text-center flex-col gap-4">
              <Icon name="error_outline" className="text-[48px]" />
              <p className="text-xl font-bold">{fetchError}</p>
          </div>
      );
  }

  if (isLoading || !curriculum) {
      return (
          <div className="min-h-screen bg-slate-900 flex items-center justify-center text-indigo-400">
              <Icon name="autorenew" className="text-[48px] animate-spin" />
          </div>
      );
  }

  // Aici continuă randarea aplicației exact cum era înainte...
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans antialiased">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/20">
            <Icon name="explore" className="text-[28px]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white">Educație Digitală Smart</h1>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 font-medium px-2 py-0.5 rounded-full border border-indigo-500/30">v2.5 (1-9)</span>
            </div>
            <p className="text-xs text-slate-400">Curriculum de Educație Tehnologică și TIC • Hărți Interactive de Dezvoltare în Spirală</p>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Icon name="search" className="absolute left-3 top-2.5 text-[16px] text-slate-400" />
          <input
            type="text"
            placeholder="Caută lecții, competențe, produse..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 placeholder-slate-500 transition-colors"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-slate-400 hover:text-white">
              <Icon name="close" className="text-[16px]" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button onClick={handleExportJSON} className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition-all">
            <Icon name="download" className="text-[14px]" />
            <span>Exportă</span>
          </button>
          
          <label className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-lg cursor-pointer transition-all">
            <Icon name="upload" className="text-[14px]" />
            <span>Importă</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button onClick={handleResetData} className="p-2 bg-slate-800 hover:bg-red-900/30 text-slate-400 hover:text-red-400 rounded-lg transition-all" title="Resetează la planul oficial">
            <Icon name="refresh" className="text-[16px]" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col">
        <div className="bg-slate-950 px-6 py-2 border-b border-slate-800/80 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            <button onClick={() => { setActiveTab('spiral'); setSearchQuery(''); }} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all ${activeTab === 'spiral' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>
              <Icon name="route" className="text-[16px]" />
              <span>Harta Dezvoltării în Spirală</span>
            </button>
            <button onClick={() => { setActiveTab('explorer'); setSearchQuery(''); }} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all ${activeTab === 'explorer' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>
              <Icon name="menu_book" className="text-[16px]" />
              <span>Explorator pe Clase</span>
            </button>
            <button onClick={() => { setActiveTab('competencies'); setSearchQuery(''); }} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all ${activeTab === 'competencies' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>
              <Icon name="workspace_premium" className="text-[16px]" />
              <span>Matrice de Competențe</span>
            </button>
          </div>
          <div className="text-xs text-slate-500 font-medium hidden lg:block">Sistem interactiv bazat pe Curriculum-ul aprobat</div>
        </div>

        <div className="flex-1 p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          
          {searchQuery && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Icon name="search" className="text-[20px] text-indigo-400" />
                  <span>Rezultatele căutării pentru: "{searchQuery}"</span>
                </h2>
                <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full">{searchResults.length} potriviri</span>
              </div>
              {searchResults.length === 0 ? (
                <div className="text-center py-12 bg-slate-950 rounded-2xl border border-slate-800">
                  <Icon name="help_outline" className="text-[48px] text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 text-lg">Nu am găsit rezultate potrivite.</p>
                  <p className="text-slate-500 text-sm mt-1">Încearcă alte cuvinte-cheie.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map(({ clasaId, scenariu, index }) => (
                    <ScenarioCard key={`${clasaId}-${scenariu.id}-${index}`} clasaId={clasaId} scenariu={scenariu} index={index} onEdit={() => setEditingScenario({ clasaId, index })} onDelete={() => handleDeleteScenario(clasaId, index)} />
                  ))}
                </div>
              )}
            </div>
          )}

          {!searchQuery && activeTab === 'spiral' && (
            <div className="space-y-8">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Icon name="trending_up" className="text-[20px] text-indigo-400" />
                    <span>Alege o axă conceptuală de dezvoltare în spirală</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Urmărește modul în care concepte similare cresc în profunzime de la Clasa I la Clasa a IX-a.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {Object.entries(THREADS).map(([key, value]) => (
                    <button key={key} onClick={() => setSelectedThread(key)} className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 ${selectedThread === key ? 'bg-slate-900 border-indigo-500 shadow-lg ring-1 ring-indigo-500/30' : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'}`}>
                      <div className={`p-2 w-fit rounded-lg bg-gradient-to-br ${value.color} text-white`}>
                        <Icon name={value.icon} className="text-[16px]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white tracking-wide leading-snug">{value.label}</p>
                        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-1">
                          {key === 'cautare' ? 'S2' : key === 'creatie' ? 'S1, S4, S5' : key === 'siguranta' ? 'S8, S9' : key === 'colaborare' ? 'S3, S10' : 'S5, S7'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                  <Icon name="info" className="text-[20px] text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Fir conceptual selectat</h4>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">{THREADS[selectedThread].desc}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-8">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Icon name="layers" className="text-[18px] text-indigo-400" />
                      <span>Harta Spirală: {THREADS[selectedThread].label}</span>
                    </h3>
                  </div>
                  <div className="flex gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Inițiere</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Dezvoltare</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Consolidare</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Avansat / Expert</span>
                  </div>
                </div>

                {spiralNodes.length === 0 ? (
                  <div className="text-center py-16 text-slate-500">
                    <Icon name="help_outline" className="text-[48px] mx-auto mb-2 opacity-50" />
                    <p className="text-base font-semibold">Nu sunt înregistrate scenarii pe acest fir conceptual.</p>
                  </div>
                ) : (
                  <div className="relative min-h-[500px] flex flex-col justify-between py-4 select-none">
                    <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500/20 via-purple-500/30 to-indigo-500/10 -translate-x-1/2 hidden md:block" />
                    <div className="space-y-12 relative z-10">
                      {spiralNodes.map((node, idx) => {
                        const isEven = idx % 2 === 0;
                        const levelColors = {
                          "Iniţiere": "bg-emerald-500 text-emerald-950 border-emerald-400/20",
                          "Dezvoltare": "bg-blue-500 text-blue-950 border-blue-400/20",
                          "Consolidare": "bg-indigo-500 text-indigo-950 border-indigo-400/20",
                          "Avansat": "bg-purple-500 text-purple-950 border-purple-400/20",
                          "Expert": "bg-pink-500 text-pink-950 border-pink-400/20",
                          "Expert (școlar)": "bg-pink-500 text-pink-950 border-pink-400/20",
                          "Expert (școlar) / Avansat": "bg-pink-500 text-pink-950 border-pink-400/20"
                        };
                        const currentLevel = node.scenariu.nivel || node.nivelClasa;
                        const levelBadgeColor = levelColors[currentLevel] || "bg-indigo-500 text-indigo-950 border-indigo-400/20";

                        return (
                          <div key={`${node.clasaId}-${node.scenariu.id}-${idx}`} className={`flex flex-col md:flex-row items-center gap-6 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <div className="w-full md:w-[45%] flex justify-center">
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700/80 transition-all duration-300 shadow-md relative w-full group">
                                <div className="flex justify-between items-start gap-4">
                                  <div>
                                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-1">Clasa a {node.clasaId}-a ({node.scenariu.id})</span>
                                    <h4 className="text-base font-extrabold text-white group-hover:text-indigo-300 transition-colors">{node.scenariu.titlu}</h4>
                                  </div>
                                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${levelBadgeColor}`}>{currentLevel}</span>
                                </div>
                                <div className="my-4 space-y-2">
                                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Produs Final</span>
                                    <p className="text-xs font-bold text-emerald-400 mt-0.5">{node.scenariu.produs}</p>
                                  </div>
                                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Lecții de referință</span>
                                    <ul className="list-decimal list-inside text-[11px] text-slate-400 mt-1 space-y-1">
                                      {node.scenariu.lectii.slice(0, 4).map((l, lIdx) => <li key={lIdx} className="truncate">{l}</li>)}
                                    </ul>
                                  </div>
                                </div>
                                <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between">
                                  <div className="flex gap-1.5">
                                    {node.scenariu.cs.map(comp => <span key={comp} className="text-[9px] font-bold bg-slate-800 border border-slate-700 text-slate-300 px-1.5 py-0.5 rounded">{comp}</span>)}
                                  </div>
                                  <button onClick={() => setEditingScenario({ clasaId: node.clasaId, index: node.index })} className="text-xs font-semibold text-indigo-400 hover:text-white flex items-center gap-1">
                                    <Icon name="edit" className="text-[14px]" /> <span>Modifică</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="w-full md:w-[10%] flex justify-center relative">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-extrabold flex items-center justify-center border-2 border-slate-950 shadow-lg scale-110 relative z-20">
                                {node.clasaId}
                              </div>
                            </div>
                            <div className="w-full md:w-[45%] text-left px-6">
                              <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl p-4">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Acțiune Dominantă & Note Metodologice</span>
                                <p className="text-xs font-medium text-slate-300 leading-relaxed italic">"{node.scenariu.actiune}"</p>
                                <p className="text-xs text-slate-500 leading-relaxed mt-2 font-medium">{node.scenariu.note}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!searchQuery && activeTab === 'explorer' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 h-fit lg:sticky lg:top-24 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Nivel de Școlaritate</h3>
                <div className="space-y-1">
                  {Object.keys(curriculum).map((clasaId) => {
                    const isSelected = selectedClass === clasaId;
                    return (
                      <button key={clasaId} onClick={() => setSelectedClass(clasaId)} className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-slate-700'}`} />
                          <span>Clasa a {clasaId}-a</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-900 text-slate-400'}`}>{curriculum[clasaId].scenarii.length} u.î.</span>
                      </button>
                    );
                  })}
                </div>
                <div className="pt-3 border-t border-slate-800">
                  <button onClick={() => { setNewScenario(prev => ({ ...prev, id: `S${curriculum[selectedClass].scenarii.length + 1}` })); setShowAddModal(true); }} className="w-full py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 hover:text-indigo-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
                    <Icon name="add" className="text-[16px]" /> <span>Adaugă Unitate</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-6">
                <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">Curriculum Clasa a {selectedClass}-a</h2>
                    <p className="text-xs text-slate-400 mt-1">Nivel recomandat: <strong className="text-indigo-400">{curriculum[selectedClass].nivel}</strong></p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-xl flex items-center gap-2">
                    <Icon name="info" className="text-[16px] text-indigo-400 shrink-0" />
                    <span className="text-xs text-slate-300 font-medium">{curriculum[selectedClass].resursa}</span>
                  </div>
                </div>

                {curriculum[selectedClass].scenarii.length === 0 ? (
                  <div className="text-center py-16 bg-slate-950 rounded-2xl border border-slate-800">
                    <Icon name="help_outline" className="text-[48px] text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 text-lg">Nu sunt scenarii în această clasă.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {curriculum[selectedClass].scenarii.map((scenariu, index) => (
                      <ScenarioCard key={`${selectedClass}-${scenariu.id}-${index}`} clasaId={selectedClass} scenariu={scenariu} index={index} onEdit={() => setEditingScenario({ clasaId: selectedClass, index })} onDelete={() => handleDeleteScenario(selectedClass, index)} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {!searchQuery && activeTab === 'competencies' && (
            <div className="space-y-8">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Icon name="workspace_premium" className="text-[20px] text-indigo-400" />
                  <span>Matricea Transversală de Competențe Specifice (CS)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Identifică rapid cum sunt distribuite cele 3 competențe fundamentale în scenariile educaționale.</p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {Object.entries(competenciesMapping).map(([key, value]) => (
                  <div key={key} className="bg-slate-950/80 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                        <div>
                          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{key}</span>
                          <h4 className="text-base font-extrabold text-white mt-0.5">{value.title}</h4>
                        </div>
                        <span className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full font-bold">{value.items.length} scenarii</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">{value.desc}</p>
                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {value.items.map(({ clasaId, scenariu, index }) => (
                          <div key={`${clasaId}-${scenariu.id}-${index}`} className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl hover:border-slate-700 flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-extrabold bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded border border-slate-700">Clasa a {clasaId}-a</span>
                                <span className="text-[10px] font-bold text-emerald-400">{scenariu.id}</span>
                              </div>
                              <h5 className="text-xs font-bold text-slate-200 mt-1.5">{scenariu.titlu}</h5>
                              <span className="text-[10px] text-slate-500 mt-1 block">Produs: <strong className="text-slate-400">{scenariu.produs}</strong></span>
                            </div>
                            <button onClick={() => { setSelectedClass(clasaId); setActiveTab('explorer'); }} className="p-1.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg">
                              <Icon name="chevron_right" className="text-[16px]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-slate-800 bg-slate-950/80 text-center py-6 px-6 text-xs text-slate-500 mt-auto">
        <p>© 2026 Resursă Educațională Deschisă pentru Educație Digitală, Clasele I-IX.</p>
      </footer>

      {editingScenario !== null && (
        <EditScenarioModal clasaId={editingScenario.clasaId} index={editingScenario.index} scenariu={curriculum[editingScenario.clasaId].scenarii[editingScenario.index]} onClose={() => setEditingScenario(null)} onSave={handleUpdateScenario} />
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Icon name="add" className="text-[20px] text-indigo-400" />
                <span>Adaugă Unitate de Învățare</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">ID Scenariu</label><input type="text" value={newScenario.id} onChange={(e) => setNewScenario(prev => ({ ...prev, id: e.target.value }))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm" /></div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Axa Conceptuală (Spirală)</label>
                <select value={newScenario.thread} onChange={(e) => setNewScenario(prev => ({ ...prev, thread: e.target.value }))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm">
                  {Object.entries(THREADS).map(([key, val]) => <option key={key} value={key}>{val.label}</option>)}
                </select>
              </div>
            </div>
            <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Titlul Unității</label><input type="text" value={newScenario.titlu} onChange={(e) => setNewScenario(prev => ({ ...prev, titlu: e.target.value }))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Competențe Specifice (cu virgulă)</label><input type="text" value={newScenario.cs.join(', ')} onChange={(e) => setNewScenario(prev => ({ ...prev, cs: e.target.value.split(',').map(s => s.trim()) }))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm" /></div>
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Produs Final</label><input type="text" value={newScenario.produs} onChange={(e) => setNewScenario(prev => ({ ...prev, produs: e.target.value }))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm" /></div>
            </div>
            <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Note Explicative</label><textarea value={newScenario.note} onChange={(e) => setNewScenario(prev => ({ ...prev, note: e.target.value }))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm h-16"></textarea></div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-all">Anulează</button>
              <button type="button" onClick={() => handleAddScenario(selectedClass)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all">Salvează Scenariul</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ScenarioCard({ clasaId, scenariu, index, onEdit, onDelete }) {
  const threadLabel = THREADS[scenariu.thread]?.label || "Arie generală";
  const levelColors = {
    "Iniţiere": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    "Dezvoltare": "bg-blue-500/15 border-blue-500/30 text-blue-400",
    "Consolidare": "bg-indigo-500/15 border-indigo-500/30 text-indigo-400",
    "Avansat": "bg-purple-500/15 border-purple-500/30 text-purple-400",
    "Expert": "bg-pink-500/15 border-pink-500/30 text-pink-400"
  };
  const levelBadge = levelColors[scenariu.nivel] || "bg-indigo-500/15 border-indigo-500/30 text-indigo-400";

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800/80 p-5 flex flex-col justify-between hover:border-slate-700 hover:shadow-lg transition-all duration-300">
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase">Clasa a {clasaId}-a</span>
            <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest">{scenariu.id}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${levelBadge}`}>{scenariu.nivel || 'Dezvoltare'}</span>
            <button onClick={onEdit} className="p-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded"><Icon name="edit" className="text-[14px]" /></button>
            <button onClick={onDelete} className="p-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 rounded"><Icon name="delete" className="text-[14px]" /></button>
          </div>
        </div>
        <h3 className="text-base font-extrabold text-white leading-snug">{scenariu.titlu}</h3>
        <span className="text-[10px] text-slate-500 font-semibold block mt-1 tracking-wide uppercase">{threadLabel}</span>
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-850">
            <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">Competențe</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {scenariu.cs.map(comp => <span key={comp} className="text-[10px] font-bold bg-slate-950 border border-slate-800 text-slate-300 px-1.5 py-0.5 rounded">{comp}</span>)}
            </div>
          </div>
          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-850">
            <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">Produs Final</span>
            <span className="text-xs font-bold text-emerald-400 mt-1 block truncate" title={scenariu.produs}>{scenariu.produs}</span>
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">Planificare Lecții</span>
          <ul className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-dashed border-slate-800">
            {scenariu.lectii.map((l, idx) => <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5"><span className="text-indigo-400 font-bold shrink-0">{idx + 1}.</span><span className="leading-normal">{l}</span></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

function EditScenarioModal({ clasaId, index, scenariu, onClose, onSave }) {
  const [form, setForm] = useState({ ...scenariu });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(clasaId, index, { ...form, lectii: form.lectii.filter(l => l.trim() !== '') });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-slate-200 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Icon name="edit" className="text-[20px] text-indigo-400" />
            <span>Modifică Unitatea de Învățare ({scenariu.id})</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><Icon name="close" className="text-[20px]" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">ID Scenariu</label><input type="text" value={form.id} onChange={(e) => setForm(prev => ({ ...prev, id: e.target.value }))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100" /></div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Axa Conceptuală (Spirală)</label>
              <select value={form.thread} onChange={(e) => setForm(prev => ({ ...prev, thread: e.target.value }))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100">
                {Object.entries(THREADS).map(([key, val]) => <option key={key} value={key}>{val.label}</option>)}
              </select>
            </div>
          </div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Titlul Unității</label><input type="text" value={form.titlu} onChange={(e) => setForm(prev => ({ ...prev, titlu: e.target.value }))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Competențe Specifice (cu virgulă)</label><input type="text" value={form.cs.join(', ')} onChange={(e) => setForm(prev => ({ ...prev, cs: e.target.value.split(',').map(s => s.trim()) }))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100" /></div>
            <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Produs Final</label><input type="text" value={form.produs} onChange={(e) => setForm(prev => ({ ...prev, produs: e.target.value }))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100" /></div>
          </div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Note Explicative</label><textarea value={form.note} onChange={(e) => setForm(prev => ({ ...prev, note: e.target.value }))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100 h-20" /></div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-all">Anulează</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all">Salvează Modificările</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
