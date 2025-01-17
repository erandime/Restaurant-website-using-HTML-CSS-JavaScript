<?php
// Check if the search query exists
if (isset($_GET['search']) && !empty($_GET['search'])) {
    $searchQuery = $_GET['search']; // Unsanitized input (intentionally vulnerable)

    // Directly output the search query into the HTML (vulnerable to XSS)
    echo "<h2>Search Results for '$searchQuery':</h2>";
    echo "<p>You searched for: $searchQuery</p>";
} else {
    echo "<h2>Please enter a search term.</h2>";
}
?>
