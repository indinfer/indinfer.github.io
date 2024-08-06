

window.FileIO = {
    saveFile: function (data, filename, type) {
        var file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    },

    loadFile: function () {
        return new Promise((resolve) => {
            // Create a hidden file input element
            let fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.style.display = "none";
            document.body.appendChild(fileInput);

            // Set up the FileReader
            let reader = new FileReader();
            reader.onload = (event) => {
                // Remove the file input element after reading the file
                document.body.removeChild(fileInput);

                // Resolve the promise with the file content
                resolve(event.target.result);
            };
            reader.onerror = (event) => {
                console.error("File could not be read: " + event.target.error);

                // Remove the file input element if an error occurred
                document.body.removeChild(fileInput);

                // Resolve the promise with an empty string
                resolve("");
            };

            // Programmatically click the file input element to open the file selection dialog
            fileInput.click();

            // Read the selected file when the file input value changes
            fileInput.onchange = () => {
                reader.readAsText(fileInput.files[0]);
            };
        });
    }


}


