import Component from 'flarum/common/Component';
import app from 'flarum/forum/app';
import m from 'mithril';

export type DiceSkinId = 'classic' | 'circle' | 'hc' | 'gradient' | 'neon';

export interface DiceSkinPickerAttrs {
  value: DiceSkinId;
  onChange: (value: DiceSkinId) => void | Promise<void>;
}

interface SkinDef {
  id: DiceSkinId;
  labelKey: string;
  exampleD6: number;
  exampleD20: number;
}

const SKINS: SkinDef[] = [
  {
    id: 'classic',
    labelKey: 'capybash-magic-dice.forum.settings.diceSkin.classic',
    exampleD6: 1,
    exampleD20: 10,
  },
  {
    id: 'circle',
    labelKey: 'capybash-magic-dice.forum.settings.diceSkin.circle',
    exampleD6: 2,
    exampleD20: 12,
  },
  {
    id: 'hc',
    labelKey: 'capybash-magic-dice.forum.settings.diceSkin.hc',
    exampleD6: 3,
    exampleD20: 14,
  },
  {
    id: 'gradient',
    labelKey: 'capybash-magic-dice.forum.settings.diceSkin.gradient',
    exampleD6: 4,
    exampleD20: 16,
  },
  {
    id: 'neon',
    labelKey: 'capybash-magic-dice.forum.settings.diceSkin.neon',
    exampleD6: 5,
    exampleD20: 18,
  },
];

export default class DiceSkinPicker extends Component<DiceSkinPickerAttrs> {
  view() {
    const current = this.attrs.value;

    return m(
      'div.DiceSkinPicker',
      SKINS.map((skin) => {
        const active = current === skin.id;
        const label = app.translator.trans(skin.labelKey);

        const d6Class =
          'roll-a-die roll-a-die--d6 roll-a-die--skin-' +
          skin.id +
          ' DiceSkin-previewDie';

        const d20Class =
          'roll-a-die roll-a-die--d20 roll-a-die--skin-' +
          skin.id +
          ' DiceSkin-previewDie';

        return m(
          'label.DiceSkin' + (active ? '.DiceSkin--active' : ''),
          [
            m('input', {
              type: 'radio',
              name: 'rollDieSkin',
              value: skin.id,
              checked: active,
              onchange: () => this.attrs.onChange(skin.id),
            }),
            m('div.DiceSkin-card', [
              m('div.DiceSkin-preview', [
                m('span', {
                  className: d6Class,
                  'data-number': String(skin.exampleD6),
                }),
                m(
                  'span',
                  {
                    className: d20Class,
                    'data-number': String(skin.exampleD20),
                  },
                  String(skin.exampleD20)
                ),
              ]),
              m('div.DiceSkin-meta', [m('div.DiceSkin-title', label)]),
            ]),
          ]
        );
      })
    );
  }
}