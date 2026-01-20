'use client';

import { useState } from 'react';
import styles from './page.module.scss';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false
  });

  // Simula uma chamada de API
  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Configurações salvas com sucesso! (Simulação)');
    }, 1500);
  };

  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const bioPadrao = `Desenvolvedor Front-end com mais de 6 anos de experiência na criação de soluções digitais robustas e escaláveis.
Tenho domínio em tecnologias como JavaScript, React, jQuery, HTML5, CSS3, SASS, Bootstrap, Gulp, Node.js e Git, além de amplo conhecimento na integração e consumo de APIs. Minha expertise com a plataforma VTEX me permitiu atuar em projetos de destaque e entregar soluções eficientes para o e-commerce.
Tive a oportunidade de colaborar em grandes iniciativas, como os projetos da Smiles, Bancolombia, Grupo Anima Educação e Samsung, sempre focando em entregar interfaces otimizadas, intuitivas e de alto desempenho.
Sou movido pela paixão por tecnologia e pelo aprendizado contínuo, sempre buscando transformar ideias em produtos digitais que agreguem valor e atendam às expectativas dos usuários.`;

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>Configurações</h1>
        <p>Gerencie suas preferências e dados da conta</p>
      </div>

      <div className={styles.grid}>

        <section className={styles.card}>
          <h2>Perfil Público</h2>
          <div className={styles.formGroup}>
            <div className={styles.avatarRow}>
              <div className={styles.avatarPlaceholder}>MV</div>
              <div className={styles.avatarInfo}>
                <button className={styles.btnSecondary}>Alterar Foto</button>
                <span>Recomendado: 400x400px</span>
              </div>
            </div>

            <div className={styles.inputRow}>
              <label>
                Nome Completo
                <input type="text" defaultValue="Matheus Vianna" />
              </label>
              <label>
                Cargo
                <input type="text" defaultValue="Senior Frontend Dev" />
              </label>
            </div>

            <label>
              Bio
              <textarea defaultValue={bioPadrao} rows={10} />
            </label>
          </div>
        </section>

        <section className={styles.card}>
          <h2>Aparência e App</h2>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3>Tema Escuro</h3>
              <p>Alternar entre modo claro e escuro</p>
            </div>
            <button
              className={`${styles.toggle} ${theme === 'dark' ? styles.active : ''}`}
              onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
            >
              <div className={styles.thumb} />
            </button>
          </div>

          <hr className={styles.divider} />

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h3>Menu Recolhido</h3>
              <p>Iniciar com a sidebar fechada</p>
            </div>
            <button className={styles.toggle}>
              <div className={styles.thumb} />
            </button>
          </div>
        </section>

        <section className={styles.card}>
          <h2>Notificações</h2>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() => toggleNotif('email')}
              />
              <span>Receber resumo semanal por e-mail</span>
            </label>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={() => toggleNotif('push')}
              />
              <span>Notificações push no navegador</span>
            </label>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={notifications.marketing}
                onChange={() => toggleNotif('marketing')}
              />
              <span>Novidades e produtos parceiros</span>
            </label>
          </div>
        </section>

      </div>

      <div className={styles.footerActions}>
        <button className={styles.btnCancel}>Cancelar</button>
        <button
          className={styles.btnSave}
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </main>
  );
}