import Floating from '../../common/floating/Floating.component';
import styles from './About.module.scss';
import fishIcon from '../../../images/gif/fish.gif';

const About = () => {
  return (
    <section className={styles.about}>
      <article className={styles.about__article}>
        <h2 className={styles.about__article__heading}>O nas</h2>

        <p className={styles.about__article__contentIndent}>
          Pomysł na powstanie projektu narodził się w wyniku kryzysu osobistego
          i potrzeby wsparcia w trudnym czasie. Z doświadczenia wiemy, jak
          ogromną rolę odgrywają w takiej sytuacji towarzyszące nam osoby.
          Jesteśmy także świadomi potencjału kryjącego się w trudnych momentach
          życia, który, choć na początku niedostrzegalny, może stanowić przełom
          ku zmianie na lepsze.
        </p>
        <p className={styles.about__article__content}>
          Fundację Peryskop współtworzymy z myślą o wszystkich, którzy pomimo
          dynamicznego rozwoju mediów społecznościowych i rosnącego
          zainteresowania psychologią w przestrzeni publicznej, w kryzysie
          psychicznym wciąż czują się pozostawieni sami sobie. Chcemy
          przestrzeni bez tabu, w której spotykamy się na najgłębszym poziomie.
          Wiemy, że posiadamy idealne warunki, by zadbać o dobrostan psychiczny
          osób takich jak my, bo tak naprawdę wszystkich nas łączą podobne
          troski i wyzwania, świadczące o naszym człowieczeństwie.
        </p>
        <p className={styles.about__article__content}>
          Z psychologią jesteśmy za pan brat. Dołącz do nas, jeśli potrzebujesz
          pomocy lub chcesz pomagać. Rola, w którą się u nas wcielisz, nie musi
          pozostać na zawsze taka sama. Każdy z nas, bez wyjątku, podlega
          procesowi ciągłych zmian, a kryzys często okazuje się stanem
          przejściowym.
        </p>
        <p className={styles.about__article__content}>
          Możemy tworzyć wspólnie unikalne miejsce, w którym osoby
          doświadczające trudnych emocji będą zaopiekowane przez naszych
          wolontariuszy, pozostających pod stałą opieką superwizyjną. Razem
          widzimy więcej, możemy więcej i jesteśmy lepiej przygotowani do
          stawiania czoła nieustannej podróży, jaką jest życie.
        </p>
        <p className={styles.about__article__contentIndent}>
          Zalążek naszego projektu powstał przez Internet i także tu, w sieci,
          chcemy tworzyć naszą społeczność. Choć mieszkamy w różnych rejonach
          Polski, pracujemy razem nad wspólnym celem i wiemy, że skutecznie
          pomagać można także online. Dla niektórych właśnie taka forma może
          okazać się jedyną dostępną.
        </p>
        <p className={styles.about__article__content}>
          Stworzyliśmy bezpieczną platformę w formie czatu przeznaczoną do
          kontaktu pomiędzy osobami będącymi w kryzysie a wolontariuszami
          niosącymi wsparcie. Istota takiej pomocy sprowadza się do rozmów jeden
          na jeden w regularnych odstępach czasu.
        </p>
        <p className={styles.about__article__content}>
          Jeśli, podobnie jak my, uważasz, że nowe technologie mogą mieć także
          dobroczynny wpływ na zdrowie psychiczne, to witaj na pokładzie!
        </p>
      </article>
      <Floating offsetLeft={74} offsetTop={120} icon={fishIcon} />
    </section>
  );
};

export default About;
