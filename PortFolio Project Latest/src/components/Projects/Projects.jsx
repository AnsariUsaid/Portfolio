import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, FreeMode, EffectCoverflow } from 'swiper/modules';
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import projects from '../../data/projects';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/effect-coverflow';
import './Projects.css';

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <section className="projects section" id="projects" ref={ref}>
      <div className="projects-inner">
        <motion.div
          className="projects-header"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            A selection of things I&apos;ve built and contributed to.
          </p>
        </motion.div>

        <motion.div
          className="projects-carousel-wrapper"
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Custom Left Arrow */}
          <button
            className="custom-nav-arrow custom-nav-prev"
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous project"
          >
            <FiChevronLeft />
          </button>

          <Swiper
            className="projects-carousel"
            modules={[Autoplay, Pagination, FreeMode, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 1.5,
              slideShadows: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            onSwiper={setSwiperInstance}
          >
            {projects.map((project, i) => (
              <SwiperSlide key={project.id}>
                <div className="project-card">
                  <span className="project-card-number">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-subtitle">{project.subtitle}</p>
                  <p className="project-card-desc">{project.description}</p>

                  <div className="project-tags">
                    {project.tech.map((t) => (
                      <span key={t} className="project-tag">{t}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FiGithub /> Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FiExternalLink /> Live
                      </a>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Right Arrow */}
          <button
            className="custom-nav-arrow custom-nav-next"
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next project"
          >
            <FiChevronRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
