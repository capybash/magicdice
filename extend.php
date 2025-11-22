<?php

namespace Capybash\MagicDice;

use Flarum\Api\Resource;
use Flarum\Api\Schema;
use Flarum\Extend;
use Flarum\Post\Event\Saving;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Arr;

return [
    (new Extend\Frontend('admin'))
        ->css(__DIR__ . '/resources/less/admin.less')
        ->js(__DIR__ . '/js/dist/admin.js'),

    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/resources/less/forum.less')
        ->js(__DIR__ . '/js/dist/forum.js'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\User())
        ->registerPreference('rollDieSkin', null, 'classic'),

    (new Extend\Event())
        ->listen(Saving::class, function (Saving $event) {
            $attributes = Arr::get($event->data, 'attributes', []);

            if (!Arr::exists($attributes, 'content')) {
                return;
            }

            /** @var SettingsRepositoryInterface $settings */
            $settings = resolve(SettingsRepositoryInterface::class);

            $rolls = [];

            if ($event->post->dice_rolls && !$settings->get('magic-dice.clearOnEdit')) {
                $existing = array_filter(explode(',', $event->post->dice_rolls), 'strlen');
                $rolls = array_values($existing);
            }

            $content = Arr::get($attributes, 'content') ?? '';

            preg_match_all(
                '~(?:^|[\n\r])(>\s*)?(\d+)d(\d+)(?=[\n\r]|$)~',
                $content,
                $matches,
                PREG_SET_ORDER
            );

            $numberOfRolls = count($matches);

            for ($i = count($rolls); $i < $numberOfRolls; $i++) {
                $match = $matches[$i];

                $count = (int) $match[2];
                $sides = (int) $match[3];

                if ($sides < 2) {
                    $sides = 6;
                }

                $rolls[] = (string) random_int(1, $sides);
            }

            $event->post->dice_rolls = implode(',', $rolls);
        }),

    (new Extend\ApiResource(Resource\PostResource::class))
        ->fields(fn () => [
            Schema\Str::make('diceRolls'),
        ]),
];