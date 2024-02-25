document.write(`
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/g/">Games</a>
    <a href="/p/">Proxy</a>
    <a href="/e/b.html">Bookmarklets</a>
    <a href="/e/m.html">Mirrors</a>
    <a href="/e/s.html">Settings</a>
  </nav>
  <div id="right">
        <form id="form-top" action="/search" method="get">
      <input type="text" name="g" class="search-bar-top" placeholder="Search For A Game">
      <button class="search-enter-top"><i class="fas fa-search"></i></button>
      </form>
      <div id="theme" class="theme"></div>
  </div>
</header>
`);

function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    body.style.backgroundColor = '#e4e3db';
    body.style.color = '#000';
    document.querySelectorAll('.mirror-item').forEach(item => {
      item.style.backgroundColor = '#1C1C1C';
      item.style.color = '#fff';
    });
    document.querySelectorAll('.search-bar, .search-bar-top').forEach(bar => {
      bar.style.backgroundColor = '#35363E';
      bar.style.color = '#fff';
    });
  } else {
    body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    body.style.backgroundColor = '#1C1C1C';
    body.style.color = '#fff';
    document.querySelectorAll('.mirror-item').forEach(item => {
      item.style.backgroundColor = '#e0dfd6';
      item.style.color = '#000';
    });
    document.querySelectorAll('.search-bar, .search-bar-top').forEach(bar => {
      bar.style.backgroundColor = '#e0dfd6';
      bar.style.color = '#000';
    });
  }
}
