// Pfad zur PDF-Datei
const url = 'https://storage.googleapis.com/quran-online/QuraanPDF/Noor-Book.com%20%20%D9%85%D8%B5%D8%AD%D9%81%20%D8%A7%D9%84%D9%85%D8%AC%D9%85%D8%B9%20%D8%A7%D9%84%D9%85%D9%84%D9%83%20%D9%81%D9%87%D8%AF%20%D9%84%201405%D9%87%203%20.pdf';

// PDF laden und Seiten in Flipbook umwandeln
pdfjsLib.getDocument(url).promise.then(function(pdf) {
    const flipbook = document.getElementById('flipbook');

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pdf.getPage(pageNum).then(function(page) {
            const viewport = page.getViewport({scale: 1.5});
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Seite rendern
            page.render({canvasContext: context, viewport: viewport}).promise.then(function() {
                const pageDiv = document.createElement('div');
                pageDiv.className = 'page';
                pageDiv.style.width = canvas.width + 'px';
                pageDiv.style.height = canvas.height + 'px';
                pageDiv.appendChild(canvas);
                flipbook.appendChild(pageDiv);

                // Wenn alle Seiten geladen sind, initialisiere das Flipbook
                if (pageNum === pdf.numPages) {
                    $('#flipbook').turn({
                        width: viewport.width,
                        height: viewport.height,
                        autoCenter: true
                    });
                }
            });
        });
    }
});
