import styles from './About.module.css';
import { Icon } from '@/components/Icon/Icon';

const features = [
  {
    icon: 'icon-wand_stars',
    title: 'Наша місія',
    description:
      'Об’єднувати людей через любов до пригод та надихати на нові відкриття.',
  },
  {
    icon: 'icon-travel_luggage_and_bags',
    title: 'Автентичні історії',
    description:
      'Ми шукаємо справжні, непередбачувані враження від мандрівників з усього світу.',
  },
  {
    icon: 'icon-communication',
    title: 'Ваша спільнота',
    description:
      'Станьте частиною спільноти, де кожен може бути і автором, і читачем.',
  },
];

export default function About() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.intro}>
          <h2 className={styles.title}>
            Проєкт, створений для тих, хто живе подорожами
          </h2>
          <p className={styles.description}>
            Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб
            нею поділилися. Наша платформа створена, щоб об’єднати людей,
            закоханих у відкриття нового. Тут ви можете ділитися власним
            досвідом, знаходити друзів та надихатися на наступні пригоди разом з
            нами.
          </p>
        </div>

        <ul className={styles.features}>
          {features.map(feature => (
            <li key={feature.title} className={styles.feature}>
              <span className={styles.iconWrapper} aria-hidden="true">
                <Icon name={feature.icon} className={styles.icon} />
              </span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
