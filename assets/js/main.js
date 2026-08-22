/**
 * ROMULO GALVAO — SITE PROFISSIONAL
 * Main JavaScript Controller
 * High-performance, Accessible, Zero External Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. THEME TOGGLE (Dark/Light Mode + Theme-Color Sync)
  // ------------------------------------------------------------------------
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  
  // Check stored preference or system default
  const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeUI(currentTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeUI(newTheme);
      showToast(`Tema ${newTheme === 'dark' ? 'Escuro' : 'Claro'} ativado.`);
    });
  });

  function updateThemeUI(theme) {
    // Update icons
    themeToggleBtns.forEach(btn => {
      const sunIcon = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
          btn.setAttribute('aria-label', 'Alternar para tema claro');
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
          btn.setAttribute('aria-label', 'Alternar para tema escuro');
        }
      }
    });

    // Update browser theme-color meta tag
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#070D18' : '#F8FAFC');
    }
  }

  // ------------------------------------------------------------------------
  // 2. HEADER SCROLL & ACTIVE LINK SPY
  // ------------------------------------------------------------------------
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header elevation
    if (scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }

    // Scroll spy
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ------------------------------------------------------------------------
  // 3. MOBILE MENU DRAWER
  // ------------------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on navigation link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ------------------------------------------------------------------------
  // 4. TECH STACK FILTER TABS
  // ------------------------------------------------------------------------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const stackCategories = document.querySelectorAll('.stack-category-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      stackCategories.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 5. SERVICE INTENT AUTOFILL & SCROLL
  // ------------------------------------------------------------------------
  const serviceCtaBtns = document.querySelectorAll('.btn-select-service');
  const serviceSelect = document.getElementById('service-interest');
  const messageTextarea = document.getElementById('form-message');

  serviceCtaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');
      
      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
      }

      const contactSection = document.getElementById('contato');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          messageTextarea?.focus();
        }, 500);
      }
    });
  });

  // ------------------------------------------------------------------------
  // 6. CONTACT FORM PROCESSING & WHATSAPP INTEGRATION
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const btnSendWhatsapp = document.getElementById('btn-send-whatsapp');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const companyInput = document.getElementById('form-company');
  const messageInput = document.getElementById('form-message');

  // Helper function to validate fields
  function validateFields() {
    let isValid = true;
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        if (!input.value.trim()) {
          input.classList.add('input-error');
          isValid = false;
        } else {
          input.classList.remove('input-error');
        }
      }
    });
    return isValid;
  }

  // Clear error styles on input
  [nameInput, emailInput, messageInput].forEach(input => {
    input?.addEventListener('input', () => {
      if (input.value.trim()) {
        input.classList.remove('input-error');
      }
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (!validateFields()) {
        showToast('Por favor, preencha os campos destacados.');
        return;
      }

      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const company = companyInput?.value.trim() || '';
      const service = serviceSelect?.value || 'Consultoria Geral';
      const message = messageInput?.value.trim() || '';

      // Format Mailto link
      const subject = encodeURIComponent(`[Contato Profissional] ${service} - ${name}`);
      const body = encodeURIComponent(
        `Nome: ${name}\n` +
        `E-mail: ${email}\n` +
        `Empresa/Organização: ${company || 'Não informada'}\n` +
        `Interesse: ${service}\n\n` +
        `Mensagem:\n${message}`
      );

      // Trigger mailto client
      window.location.href = `mailto:romulo.galvao@rginf.tec.br?subject=${subject}&body=${body}`;
      showToast('Abrindo seu cliente de e-mail...');
    });
  }

  if (btnSendWhatsapp) {
    btnSendWhatsapp.addEventListener('click', (e) => {
      e.preventDefault();

      const name = nameInput?.value.trim() || '';
      const company = companyInput?.value.trim() || '';
      const service = serviceSelect?.value || 'Consultoria TIC';
      const message = messageInput?.value.trim() || '';

      if (!name) {
        nameInput?.classList.add('input-error');
        nameInput?.focus();
        showToast('Informe ao menos seu nome para iniciarmos no WhatsApp.');
        return;
      }

      const text = encodeURIComponent(
        `Olá, Romulo Galvao!\n\n` +
        `Meu nome é *${name}*${company ? ` da empresa *${company}*` : ''}.\n` +
        `Tenho interesse em: *${service}*.\n\n` +
        (message ? `Detalhes: ${message}` : `Gostaria de agendar uma conversa técnica sobre um projeto.`)
      );

      const phone = '5584999929103'; // Número profissional oficial
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
      showToast('Iniciando conversa no WhatsApp...');
    });
  }

  // ------------------------------------------------------------------------
  // 7. COPY TO CLIPBOARD HELPER
  // ------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copiado: ${textToCopy}`);
        }).catch(() => {
          showToast('Não foi possível copiar automaticamente.');
        });
      }
    });
  });

  // ------------------------------------------------------------------------
  // 8. TOAST NOTIFICATION UTILITY
  // ------------------------------------------------------------------------
  let toastTimeout;
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    
    toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg> <span>${message}</span>`;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // ------------------------------------------------------------------------
  // 9. MODAL CONTROLLER (LGPD & Service Terms)
  // ------------------------------------------------------------------------
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn, .modal-overlay');

  window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target === btn || btn.classList.contains('modal-close-btn')) {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });

  // ------------------------------------------------------------------------
  // 10. CURRENT YEAR IN FOOTER
  // ------------------------------------------------------------------------
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});
