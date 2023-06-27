<template>
  <section class="sectionHardox container">
    <div class="sectionHardox__info">
      <h2 class="sectionHardox__title">Сталь HARDOX</h2>
      <p class="sectionHardox__description">
        Под{{ NBSP }}товарным знаком Hardox® выпускается толстолистовая сталь,
        не{{ NBSP }}имеющая в{{ NBSP }}мире аналогов по{{ NBSP }}стойкости к{{
          NBSP
        }}абразивному износу. Созданная для{{ NBSP }}работы в{{
          NBSP
        }}экстремально тяжёлых условиях.
        <br />
        <br />
        Сочетание таких свойств, как{{ NBSP }}особая твёрдость, прочность и{{
          NBSP
        }}ударная вязкость, принесла стали Hardox® славу исключительно стойкого
        к{{ NBSP }}абразивному износу материала, призванного продлевать срок
        службы оборудования, деталей и{{ NBSP }}конструкций в{{ NBSP }}самых
        неблагоприятных условиях эксплуатации.
      </p>
    </div>

    <div>
      <ul class="sectionHardox__list">
        <li class="sectionHardox__item">
          <h3 class="sectionHardox__itemTitle">Hardox 400</h3>
          <p class="sectionHardox__itemDescription">
            Сталь широкого применения, стойкая к{{ NBSP }}износу и{{
              NBSP
            }}абразивному истиранию.
          </p>
        </li>
        <li class="sectionHardox__item">
          <h3 class="sectionHardox__itemTitle">Hardox 450</h3>
          <p class="sectionHardox__itemDescription">
            Стойкая к{{ NBSP }}абразивному истиранию с{{ NBSP }}номинальной
            твёрдостью в{{ NBSP }}450{{ NBSP }}единиц по{{ NBSP }}Бринеллю.
          </p>
        </li>
        <li class="sectionHardox__item">
          <h3 class="sectionHardox__itemTitle">Hardox 500</h3>
          <p class="sectionHardox__itemDescription">
            Сталь, легко поддающаяся гибке и{{ NBSP }}сварке, при{{ NBSP }}этом
            стойкая к{{ NBSP }}абразивному истиранию.
          </p>
        </li>
        <li class="sectionHardox__item">
          <h3 class="sectionHardox__itemTitle">Hardox 500{{ NBSP }}Tuf</h3>
          <p class="sectionHardox__itemDescription">
            Износостойкую сталь Hardox нового поколения.
          </p>
        </li>
        <li class="sectionHardox__item">
          <h3 class="sectionHardox__itemTitle">Hardox 550</h3>
          <p class="sectionHardox__itemDescription">
            Твёрдость в{{ NBSP }}550{{ NBSP }}единиц по{{ NBSP }}Бринеллю,
            ударная вязкость.
          </p>
        </li>
        <li class="sectionHardox__item">
          <h3 class="sectionHardox__itemTitle">Hardox 600</h3>
          <p class="sectionHardox__itemDescription">
            Сверхтвёрдая, сверхпрочная сталь для{{ NBSP }}применения в{{
              NBSP
            }}условиях экстремального износа.
          </p>
        </li>
      </ul>

      <NuxtLink to="/articles/hardox" class='sectionHardox__link'>
        <BaseButton link>Подробнее</BaseButton>
      </NuxtLink>
    </div>
  </section>
</template>

<style lang="scss">
.sectionHardox {
  padding-top: 164px;
  padding-bottom: 164px;
  display: flex;
  gap: var(--grid-gap);

  &__info {
    width: calc((100% + var(--grid-gap)) / 12 * 7 - var(--grid-gap));
    padding-right: calc((100% + var(--grid-gap)) / 12);
    border-right: 2px solid #111112;
  }

  &__title {
    color: #111112;
    font-size: 64px;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 40px;
  }

  &__description {
    color: #111112;
    font-size: 24px;
    line-height: 34px;
    margin: 0;
    max-width: 658px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 40px;
    flex: 1;
    list-style: none;
    margin: 0 0 50px;
    padding: 0;
  }

  &__item {
    position: relative;
    padding-left: calc((100% + var(--grid-gap)) / 5 * 2);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      height: 100%;
      width: calc((100% + var(--grid-gap)) / 5 * 2 - var(--grid-gap));
    }

    &:nth-child(1)::before {
      border-top: 2px solid #b76902;
      border-right: 2px solid #b76902;
    }

    &:nth-child(2)::before {
      border-top: 2px solid #b76902;
      border-left: 2px solid #b76902;
    }

    &:nth-child(3)::before {
      border-bottom: 2px solid #b76902;
      border-left: 2px solid #b76902;
    }

    &:nth-child(4)::before {
      border-top: 2px solid #b76902;
      border-left: 2px solid #b76902;
    }

    &:nth-child(5)::before {
      border-top: 2px solid #b76902;
      border-right: 2px solid #b76902;
    }

    &:nth-child(6)::before {
      border-bottom: 2px solid #b76902;
      border-left: 2px solid #b76902;
    }
  }

  &__itemTitle {
    color: #111112;
    font-size: 18px;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 4px;
  }

  &__itemDescription {
    color: #111112;
    font-size: 16px;
    line-height: 26px;
    margin: 0;
  }

  &__link {
    display: block;
    width: fit-content;
    margin-left: auto;
  }
}
</style>
