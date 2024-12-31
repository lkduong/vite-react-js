export function saveJsonFile(storageObj = {}, fileName = "parquet.json") {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem?.setAttribute("href",     dataStr     );
    dlAnchorElem?.setAttribute("download", fileName + ".json");
    dlAnchorElem?.click();
};