document.addEventListener('DOMContentLoaded', function() {
    // Playful cursor effect
    document.body.addEventListener('mousemove', function(e) {
        // Create a cursor element
        var cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';

        // Append cursor element to body
        document.body.appendChild(cursor);

        // Remove cursor element after a short delay
        setTimeout(function() {
            cursor.remove();
        }, 1000);
    });
});