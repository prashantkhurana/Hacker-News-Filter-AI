window.onload = function () {
    // Regular expression to match the keywords "AI" or "GPT"
    const keywordRegex = /\b(AI|GPT)\b/i;

    // Find all the submissions on the page
    const submissions = document.querySelectorAll(".athing");
    const filteredLinks = [];
    const isHomePage = window.location.href.match("https://news.ycombinator.com/$") || window.location.href.match("https://news.ycombinator.com/news/*");
    if (!isHomePage) {
        return;
    }
    // Loop through the submissions
    for (let i = 0; i < submissions.length; i++) {
        const submission = submissions[i];

        // Find the submission title and metadata(author, points, etc) elements
        const title = submission.querySelector(".title a");
        const submissionMetaData = submission.nextElementSibling;

        // Check if the submission title contains the keywords
        const shouldRemove = (title && keywordRegex.test(title.textContent))
        if (shouldRemove) {
            const link = {
                title: title ? title.textContent.trim() : "",
                url: 'https://news.ycombinator.com/item?id=' + submission.getAttribute('id')
            };
            filteredLinks.push(link);
            submission.parentNode.removeChild(submission);
            submissionMetaData.parentNode.removeChild(submissionMetaData);
        }
    }

    chrome.storage.local.set({ filteredLinks: JSON.stringify(filteredLinks) });
    chrome.runtime.sendMessage({ action: "contentScriptFinished" });
};
