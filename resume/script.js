$(function () {
  // Theme toggle (remembered)
  var saved; try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved) $('html').attr('data-theme', saved);
  $('#theme').on('click', function () {
    var next = $('html').attr('data-theme') === 'dark' ? 'light' : 'dark';
    $('html').attr('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Mobile menu
  $('#menu').on('click', function () { $('nav ul').toggleClass('open'); });

  // Active nav link
  var page = location.pathname.split('/').pop() || 'index.html';
  $('nav ul a').each(function () { if ($(this).attr('href') === page) $(this).addClass('active'); });

  // Typing effect on the home tagline (the page's one animated moment)
  var $t = $('#typed');
  if ($t.length) {
    var text = $t.data('text'), i = 0;
    (function type() { $t.text(text.slice(0, ++i)); if (i < text.length) setTimeout(type, 55); })();
  }

  // Reveal sections and fill skill bars when scrolled into view
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      $(e.target).addClass('in');
      $(e.target).find('.fillbar').each(function () { $(this).css('width', $(this).data('level') + '%'); });
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  $('.reveal').each(function () { io.observe(this); });

  // Print bio-data
  $('#print').on('click', function () { window.print(); });

  // Contact form: validate, then open the visitor's mail app
  $('#contact-form').on('submit', function (ev) {
    ev.preventDefault();
    var n = $('#name').val().trim(), m = $('#msg').val().trim(), em = $('#mail').val().trim();
    if (!n || !m || !/^\S+@\S+\.\S+$/.test(em)) { $('#note').text('Enter your name, a valid email and a message.'); return; }
    var body = encodeURIComponent(m + '\n\n' + n + ' (' + em + ')');
    window.location.href = 'mailto:rvit24bcs130.rvitm@rvei.edu.in?subject=' + encodeURIComponent('Message from ' + n) + '&body=' + body;
    $('#note').text('Opening your email app. Thanks for reaching out, ' + n + '.');
  });

  $('#year').text(new Date().getFullYear());
});
