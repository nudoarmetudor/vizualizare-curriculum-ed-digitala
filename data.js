// Dataset-ul inițial mapat conform curriculumului oficial
let curriculumData = {
    "I": {
        nivel: "Iniţiere", // cite: 4
        resursa: "4 Scenarii pe an, 4 Lecţii per scenariu", // cite: 5
        scenarii: [
            {
                id: "S1",
                titlu: "Creez un produs digital", // cite: 6
                cs: ["CS1", "CS3"], // cite: 6
                uc: ["UC1.1", "UC1.2", "UC3.1"], // cite: 6
                actiune: "Utilizează instrumente simple prin manipulare ghidată.", // cite: 6
                produs: "Desen digital", // cite: 6
                note: "Se pune accent pe coordonarea ochi-mână și familiarizarea cu interfața grafică elementară (Paint sau aplicații online simple).", // cite: 6
                lectii: [
                    "Primii pași: Echipamentele digitale din jurul meu.", // cite: 6
                    "Prietenul meu, mouse-ul: Mişcare și clic.", // cite: 6
                    "Lumea culorilor în programul de desen.", // cite: 6
                    "Prima mea operă de artă digitală." // cite: 6
                ]
            },
            {
                id: "S6",
                titlu: "Mă organizez digital", // cite: 6
                cs: ["CS1", "CS2"], // cite: 6
                uc: ["UC1.2", "UC2.1", "UC2.3"], // cite: 6
                actiune: "Salvează şi deschide fişiere ca rutină de bază.", // cite: 6
                produs: "Folder personalizat", // cite: 6
                note: "Elevii învaţă importanța organizării şi persistentei datelor. Se exersează deschiderea și închiderea corectă a aplicațiilor.", // cite: 6
                lectii: [
                    "Unde se ascunde munca mea? Noţiunea de fişier.", // cite: 6
                    "Dulapul cu secrete: Folderul.", // cite: 6
                    "\"Salvarea\" - butonul magic pentru a nu pierde munca.", // cite: 6
                    "Ordinea în folderul clasei." // cite: 6
                ]
            }
            // Datele pot fi extinse similar pentru S4, S9 din Clasa I...
        ]
    },
    "II": {
        nivel: "Dezvoltare (predominant) / Inițiere (pentru căutare)", // cite: 19
        resursa: "4 Scenarii pe an, 4 Lecţii per scenariu", // cite: 20
        scenarii: [
            {
                id: "S1",
                titlu: "Creez un produs digital", // cite: 21
                cs: ["CS1", "CS3"], // cite: 21
                uc: ["UC1.1", "UC3.1"], // cite: 21
                actiune: "Creează document simplu; combină text + imagine.", // cite: 21
                produs: "Document ilustrat", // cite: 21
                note: "Se folosesc editori de text simplificați. Accentul cade pe relația vizuală dintre mesajul scris și imaginea care îl susţine.", // cite: 21
                lectii: [
                    "Documentul digital: Textul şi imaginea prieteni.", // cite: 21
                    "Cum inserăm o imagine într-o pagină.", // cite: 21
                    "Scriem cuvinte și le schimbăm hainele (formatare text).", // cite: 21
                    "Povestea mea ilustrată." // cite: 21
                ]
            }
        ]
    },
    "VI": {
        nivel: "Consolidare / Dezvoltare", // cite: 105
        resursa: "4 Scenarii pe an, 4 Lecţii per scenariu", // cite: 106
        scenarii: [
            {
                id: "S8",
                titlu: "Verific informaţii", // cite: 109
                cs: ["CS1"], // cite: 109
                uc: ["UC1.1", "UC1.2", "UC1.3"], // cite: 109
                actiune: "Realizează analiza critică a conţinutului media.", // cite: 109
                produs: "Dosar de analiză media (Fact-check)", // cite: 109
                note: "Elevii devin \"detectivi digitali\", învăţând să identifice mecanismele de dezinformare moderne.", // cite: 109
                lectii: [
                    "Anatomia unei știri: Fapte vs. Opinii.", // cite: 109
                    "Bias-ul mediatic: Cum ne influențează algoritmii opinia.", // cite: 109
                    "Tehnici de fact-checking: Căutarea inversă de imagini şi verificarea sursei originale.", // cite: 109
                    "Deepfake şi conținutul manipulat: Semne de avertizare." // cite: 109
                ]
            }
        ]
    }
    // ... Structura continuă identic pentru toate clasele (III, IV, V, VII, VIII, IX)
};

let currentClass = "I";

// Inițializarea aplicației
document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem('smartCurriculum')) {
        curriculumData = JSON.parse(localStorage.getItem('smartCurriculum'));
    }
    renderClassTabs();
    loadClass(currentClass);
});

function renderClassTabs() {
    const container = document.getElementById("class-tabs");
    container.innerHTML = "";
    Object.keys(curriculumData).forEach(clasa => {
        const btn = document.createElement("button");
        btn.className = `w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between transition ${currentClass === clasa ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`;
        btn.onclick = () => loadClass(clasa);
        btn.innerHTML = `<span>Clasa a ${clasa}-a</span><span class="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">${curriculumData[clasa].scenarii.length} u.î.</span>`;
        container.appendChild(btn);
    });
}

function loadClass(clasa) {
    currentClass = clasa;
    renderClassTabs();
    
    // Încarcă Meta Datele clasei
    const meta = curriculumData[clasa];
    document.getElementById("class-meta").innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 class="text-2xl font-bold text-gray-900">Curriculum Clasa a ${clasa}-a</h2>
                <p class="text-sm text-gray-500 mt-1">Nivel de dezvoltare țintă: <span class="font-semibold text-indigo-600">${meta.nivel}</span></p>
            </div>
            <div class="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 flex items-center space-x-3 self-start md:self-center">
                <span class="material-icons text-indigo-600">schedule</span>
                <span class="text-xs text-indigo-900 font-medium">${meta.resursa}</span>
            </div>
        </div>
    `;

    // Încarcă Scenariile
    renderScenarios(clasa);
}

function renderScenarios(clasa) {
    const container = document.getElementById("scenarios-container");
    container.innerHTML = "";
    
    curriculumData[clasa].scenarii.forEach((sc, index) => {
        const card = document.createElement("div");
        card.className = "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between relative group";
        
        let lectiiList = sc.lectii.map((l, i) => `<li class="text-xs text-gray-600 flex items-start"><span class="text-indigo-400 font-semibold mr-1.5">${i+1}.</span> ${l}</li>`).join("");
        
        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-3">
                    <span class="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded-md uppercase">${sc.id}</span>
                    <div class="opacity-0 group-hover:opacity-100 transition absolute top-4 right-4 flex space-x-1">
                        <button onclick="openEditor('${index}')" class="p-1.5 bg-gray-100 text-gray-600 hover:text-indigo-600 rounded-md transition" title="Editează"><span class="material-icons text-sm">edit</span></button>
                        <button onclick="deleteScenario('${index}')" class="p-1.5 bg-gray-100 text-gray-600 hover:text-red-600 rounded-md transition" title="Șterge"><span class="material-icons text-sm">delete</span></button>
                    </div>
                </div>
                <h4 class="text-base font-bold text-gray-900 mb-2">${sc.titlu}</h4>
                
                <div class="grid grid-cols-2 gap-2 my-3">
                    <div class="bg-gray-50 p-2 rounded-lg"><span class="block text-[10px] text-gray-400 uppercase font-bold">Competențe Specificie</span><span class="text-xs font-semibold text-gray-700">${sc.cs.join(', ')}</span></div>
                    <div class="bg-gray-50 p-2 rounded-lg"><span class="block text-[10px] text-gray-400 uppercase font-bold">Produs Final</span><span class="text-xs font-semibold text-emerald-700 truncate block">${sc.produs}</span></div>
                </div>

                <div class="my-3">
                    <span class="block text-[10px] text-gray-400 uppercase font-bold mb-1">Unitate de conținut (Lecții)</span>
                    <ul class="space-y-1.5 bg-slate-50/60 p-3 rounded-xl border border-dashed border-gray-200">${lectiiList}</ul>
                </div>
            </div>
            <div class="mt-4 pt-3 border-t border-gray-100">
                <p class="text-xs text-gray-500 italic"><strong class="not-italic text-gray-700 font-semibold">Notă:</strong> ${sc.note}</p>
            </div>
        `;
        container.appendChild(card);
    });
}
