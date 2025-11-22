import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import m from 'mithril';

function Section(iconClass: string, titleKey: string, ...children: any[]) {
  return m(
    'section.MagicDice-SettingsSection',
    m('h3', [
      m('i', { className: iconClass, 'aria-hidden': 'true' }),
      m('span', ' ' + app.translator.trans(titleKey)),
    ]),
    m('div.MagicDice-SettingsSection-content', children)
  );
}

export default class MagicDicePage extends ExtensionPage {
  className() {
    return 'MagicDicePage';
  }

  content() {
    return m(
      'div.MagicDicePage',
      m('div.MagicDicePage-content', [
        Section(
          'fas fa-dice',
          'capybash-magic-dice.admin.settings.section_main',
          m(
            'div.Form-group',
            this.buildSettingComponent({
              type: 'boolean',
              setting: 'magic-dice.clearOnEdit',
              label: app.translator.trans(
                'capybash-magic-dice.admin.settings.clearOnEdit'
              ),
            })
          )
        ),
        m('div.Form-group', this.submitButton()),
      ])
    );
  }
}