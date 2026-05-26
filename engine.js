function openEditor(index) {
    const sc = curriculumData[currentClass].scenarii[index];
    const modal = document.getElementById("editor-modal");
    const content = document.getElementById("modal-content");
    
    modal.classList.remove("hidden");
    setTimeout(() => {
        content.classList.remove("scale-95", "opacity-0");
    }, 50);

    content.innerHTML = `
        <div class="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
            <h3 class="text-lg font-bold text-gray-900">Editează Unitatea de Învățare (${sc.id})</h3>
            <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600"><span class="material-icons">close</span></button>
        </div>
        <form id="edit-form" class="space-y-4" onsubmit="saveScenario(event, ${index})">
            <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Titlu Scenariu</label>
                <input type="text" id="edit-titlu" value="${sc.titlu}" class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Competențe Specifice (separate prin virgulă)</label>
                    <input type="text" id="edit-cs" value="${sc.cs.join(', ')}" class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Produs Final</label>
                    <input type="text" id="edit-produs" value="${sc.produs}" class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Lecții (Liniile reflectă ordinea secvențială)</label>
                <textarea id="edit-lectii" rows="4" class="w-full border border-gray-300 rounded-lg p-2 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none">${sc.lectii.join('\n')}</textarea>
                <span class="text-[11px] text-gray-400">Fiecare linie reprezintă o lecție din cele 4 planificate.</span>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Note Metodologice / Explicații</label>
                <textarea id="edit-note" rows="2" class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">${sc.note}</textarea>
            </div>
            <div class="flex justify-end space-x-2 pt-4 border-t border-gray-100">
                <button type="button" onclick="closeModal()" class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">Anulează</button>
                <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">Salvează Modificările</button>
            </div>
        </form>
    `;
}

function closeModal() {
    const modal = document.getElementById("editor-modal");
    const content = document.getElementById("modal-content");
    content.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
        modal.classList.add("hidden");
    }, 200);
}

function saveScenario(event, index) {
    event.preventDefault();
    const sc = curriculumData[currentClass].scenarii[index];
    
    sc.titlu = document.getElementById("edit-titlu").value;
    sc.produs = document.getElementById("edit-produs").value;
    sc.note = document.getElementById("edit-note").value;
    sc.cs = document.getElementById("edit-cs").value.split(",").map(s => s.trim());
    sc.lectii = document.getElementById("edit-lectii").value.split("\n").filter(l => l.trim() !== "");
    
    // Salvare persistentă în LocalStorage
    localStorage.setItem('smartCurriculum', JSON.stringify(curriculumData));
    
    closeModal();
    loadClass(currentClass);
}

function exportCurriculum() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(curriculumData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Curriculum_Personalizat_ED_${currentClass}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}
