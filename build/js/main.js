'use strict';

(function () {
  var chapters = document.querySelector('.chapters');
  var contacts = document.querySelector('.contacts');

  if (document.contains(chapters) && document.contains(contacts)) {
    var footer = document.querySelector('.page-footer');
    var chaptersHeader = document.querySelector('.chapters h2');
    var contactsHeader = document.querySelector('.contacts h2');

    chapters.classList.remove('chapters--nojs');
    chapters.classList.add('chapters--closed');
    contacts.classList.remove('contacts--nojs');
    contacts.classList.add('contacts--opened');
    footer.classList.remove('page-footer--nojs');
    footer.classList.add('page-footer--closed');

    var slidesToggle = function () {
      chapters.classList.toggle('chapters--closed');
      chapters.classList.toggle('chapters--opened');
      contacts.classList.toggle('contacts--closed');
      contacts.classList.toggle('contacts--opened');
      footer.classList.toggle('page-footer--closed');
      footer.classList.toggle('page-footer--opened');
    };

    var checkWindowSize = function () {
      if (window.innerWidth <= 767) {
        chaptersHeader.setAttribute('tabIndex', '0');
        contactsHeader.setAttribute('tabIndex', '0');
      } else {
        chaptersHeader.setAttribute('tabIndex', '-1');
        contactsHeader.setAttribute('tabIndex', '-1');
      }
    };

    window.addEventListener('resize', checkWindowSize);

    chapters.addEventListener('click', slidesToggle);
    contacts.addEventListener('click', slidesToggle);

    chaptersHeader.addEventListener('focus', function () {
      if (window.innerWidth < 768) {
        document.addEventListener('keydown', function (keyEvent) {
          if (keyEvent.code === 'Space') {
            slidesToggle();
          }
        });
      }
    });

    contactsHeader.addEventListener('focus', function () {
      if (window.innerWidth < 768) {
        document.addEventListener('keydown', function (keyEventTwo) {
          if (keyEventTwo.code === 'Space') {
            slidesToggle();
          }
        });
      }
    });
  }
})();

(function () {
  var link = document.querySelector('.additional a');
  var form = document.querySelector('.feedback form');

  link.addEventListener('click', function (evt) {
    if (document.contains(form)) {
      evt.preventDefault();

      form.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
})();

(function () {
  var body = document.body;
  var mainForm = document.querySelector('.form--main');
  var order = document.querySelector('.navbar__order');
  var popup = document.querySelector('.popup');
  var popupClose = popup.querySelector('.popup__close');
  var phone = document.querySelector('#phone');
  var name = document.querySelector('#name');
  var question = document.querySelector('#question');
  var namePopup = document.querySelector('#namePopup');
  var phonePopup = document.querySelector('#phonePopup');
  var questionPopup = document.querySelector('#questionPopup');
  var checkboxLabel = document.querySelector('#checkbox');
  var checkbox = document.querySelector('#agreement');

  var isStorageSupport = true;
  var storage = {};

  try {
    storage.name = localStorage.getItem('name');
    storage.phone = localStorage.getItem('phone');
    storage.question = localStorage.getItem('question');
  } catch (err) {
    isStorageSupport = false;
  }

  window.addEventListener('load', function () {
    if (storage) {
      phone.value = storage.phone;
      name.value = storage.name;
      question.value = storage.question;
    }
  });

  checkboxLabel.addEventListener('focus', function () {
    document.addEventListener('keydown', function (evt) {
      if (evt.code === 'Space') {
        evt.preventDefault();

        if (checkbox.checked) {
          checkbox.checked = false;
        } else {
          checkbox.checked = true;
        }
      }
    });
  });

  var phoneDataCheck = function (input) {
    input.addEventListener('focus', function () {
      input.value = '+7(';
    });

    input.addEventListener('input', function () {
      if (input.value.length === 6 && !input.value.includes(')')) {
        var phoneValue = input.value;
        input.value = phoneValue + ')';
      }
    });
  };

  order.addEventListener('click', function (evt) {
    if (document.contains(popup)) {
      evt.preventDefault();
      popup.classList.add('popup--opened');
      popup.classList.remove('popup--closed');
      body.classList.add('page-body--popup');

      namePopup.focus();

      if (storage) {
        phonePopup.value = storage.phone;
        namePopup.value = storage.name;
        questionPopup.value = storage.question;
      }

      phoneDataCheck(phonePopup);
    }

    var closePopup = function () {
      popup.classList.remove('popup--opened');
      popup.classList.add('popup--closed');
      body.classList.remove('page-body--popup');
    };

    window.addEventListener('click', function (windowClick) {
      if (!popup.contains(windowClick.target) && windowClick.target !== order && popup.classList.contains('popup--opened')) {
        closePopup();
      }
    });

    window.addEventListener('keydown', function (keydownEvt) {
      if (keydownEvt.key === 'Escape' || keydownEvt.key === 'Esc') {
        closePopup();
      }
    });

    popupClose.addEventListener('click', closePopup);
  });

  if (document.contains(mainForm)) {
    phoneDataCheck(phone);
  }

  mainForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (isStorageSupport) {
      localStorage.setItem('name', name.value);
      localStorage.setItem('phone', phone.value);
      localStorage.setItem('question', question.value);
    }

    if (phone.value !== '' && name.value !== '' && question.value !== '') {

      mainForm.submit();
    }
  });
})();
