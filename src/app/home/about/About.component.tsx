import styles from "./About.module.scss"

const About = () => {

    return (
        <section className={styles.about}>
            <article className={styles.about__article}>
                <h2 className={styles.about__article__heading}>
                    O nas
                </h2>
                <p className={styles.about__article__content}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim illo laudantium rerum, commodi sed nisi autem, quibusdam non tempore dolore obcaecati quidem pariatur quae, vitae quisquam sequi ea amet. Consequatur, eveniet? Eius itaque suscipit commodi beatae quidem, eos architecto, temporibus molestias necessitatibus ex sint ducimus provident excepturi maxime cupiditate saepe exercitationem voluptatibus! Porro provident enim odio corrupti aspernatur inventore vel maiores. Magnam iste dignissimos, dolore obcaecati minima odit fugiat consequatur iure soluta nesciunt quia? Quasi nisi amet voluptatem enim incidunt porro, aliquam odit laboriosam! Ab quae omnis voluptate sit atque minima, doloribus quia dolores vero fuga voluptates ipsa nisi ad?</p>
            </article>
        </section>
    )
}

export default About;