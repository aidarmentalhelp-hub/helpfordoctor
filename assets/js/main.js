import menuManager from './menu.js';
import modalManager from './modal.js';
import Utils from './utils.js';

class App {
    constructor() {
        this.init();
    }

    init() {
        console.log('App initialized');
        
        // Инициализация компонентов
        this.initComponents();
        
        // Настройка глобальных обработчиков
        this.setupGlobalHandlers();
        
        // Загрузка данных при необходимости
        this.loadInitialData();
    }

    initComponents() {
        // Инициализация меню (автоматически происходит при импорте)
        console.log('Menu manager initialized:', menuManager);
        
        // Регистрация модальных окон
        this.registerModals();
        
        // Инициализация других компонентов
        this.initScrollBehavior();
        this.initAnalytics();
    }

    registerModals() {
        // Пример регистрации модальных окон
        // modalManager.registerModal('feedback-modal', {
        //     closeOnOverlayClick: true,
        //     closeOnEsc: true
        // });
        
        console.log('Modal manager initialized:', modalManager);
    }

    setupGlobalHandlers() {
        // Глобальные обработчики ошибок
        window.addEventListener('error', this.handleGlobalError.bind(this));
        
        // Обработчик изменения размера окна с дебаунсом
        window.addEventListener('resize', Utils.debounce(this.handleResize.bind(this), 250));
        
        // Обработчик видимости страницы
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    handleGlobalError(event) {
        console.error('Global error:', event.error);
        // Можно добавить отправку ошибок на сервер
    }

    handleResize() {
        console.log('Window resized:', window.innerWidth, 'x', window.innerHeight);
        
        // Обновляем поведение для мобильных устройств
        if (Utils.isMobile()) {
            // Дополнительные действия для мобильных
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            console.log('Page is hidden');
        } else {
            console.log('Page is visible');
        }
    }

    initScrollBehavior() {
        // Плавная прокрутка для внутренних ссылок
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                Utils.scrollToElement(targetId, 80); // offset для фиксированного header
            });
        });
    }

    initAnalytics() {
        // Базовая аналитика (можно подключить Google Analytics и т.д.)
        this.trackPageView();
    }

    trackPageView() {
        console.log('Page viewed:', window.location.pathname);
        // Здесь можно добавить вызов analytics.track()
    }

    loadInitialData() {
        // Загрузка начальных данных при необходимости
        // Например, последние новости, пользовательские настройки и т.д.
    }

    // Публичные методы для внешнего использования
    showNotification(message, type = 'info') {
        console.log(`Notification (${type}):`, message);
        // Реализация уведомлений
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        Utils.saveToStorage('theme', theme);
    }

    getTheme() {
        return Utils.loadFromStorage('theme') || 'light';
    }
}

// Инициализация приложения при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    window.App = new App();
    console.log('Application started successfully');
});

// Экспорт для использования в других модулях
export default App;