import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  imgSrc: string;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'MinePay',
    imgSrc: require('@site/static/img/minepay.png').default,
    link: '/docs/minepay/intro',
    description: (
      <>
        Her kan du se hvordan du kan bruge MinePay på din server.
      </>
    ),
  },
  {
    title: 'Guides',
    imgSrc: require('@site/static/img/guides.png').default,
    link: '/docs/guides/intro',
    description: (
      <>
        Lær nye muligheder på Mineklub ved at læse disse guides!
      </>
    ),
  },
];

function Feature({title, imgSrc, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center">
        <img src={imgSrc} alt={title} className={styles.featureImg} width={400} height={100} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
      <div className='features-link text--center'>
        <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to={link}>
              Tryk Her!
            </Link>
          </div>
        </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
