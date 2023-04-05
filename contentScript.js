window.onload = function() {
    // Regular expression to match the keywords "AI" or "GPT"
    const keywordRegex = /\b(AI|GPT)\b/i;
  
    // Find all the submissions on the page
    const submissions = document.querySelectorAll(".athing");
    const filteredLinks = [];
    const isHomePage = window.location.href === "https://news.ycombinator.com/" || window.location.href === "https://news.ycombinator.com/news";
    if (!isHomePage) {
        return;
    }
    // Loop through the submissions
    for (let i = 0; i < submissions.length; i++) {
      const submission = submissions[i];
  
      // Find the submission title and content elements
      const title = submission.querySelector(".title a");
      const content = submission.nextElementSibling;
  
     // Check if the submission title or content contains the keywords
      const shouldRemove = (title && keywordRegex.test(title.textContent)) || content && keywordRegex.test(content.textContent);
      if (shouldRemove) {
        const link = {
            title: title ? title.textContent.trim() : "",
            url: 'https://news.ycombinator.com/item?id=' + submission.getAttribute('id')
        };
        filteredLinks.push(link);
        submission.parentNode.removeChild(submission);
      }
    }
    
    chrome.storage.local.set({ filteredLinks: JSON.stringify(filteredLinks) });
    chrome.runtime.sendMessage({ action: "contentScriptFinished" });
  };
  