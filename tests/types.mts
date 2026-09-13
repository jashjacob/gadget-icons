import { svg, names, icons, type IconName, type SvgOptions } from 'gadget-icons';

const name: IconName = 'external-hard-drive';
const options: SvgOptions = { size: 32, strokeWidth: 1.8, className: 'device' };
const markup: string = svg(name, options);
const label: string = icons['sd-card'].label;
names.forEach((icon) => svg(icon));
// @ts-expect-error Unknown names must be caught before runtime.
svg('camra');
// @ts-expect-error Options should have numeric sizes.
svg('camera', { size: 'large' });
// @ts-expect-error Catch misspelled option names.
svg('camera', { strokeWidht: 2 });
// @ts-expect-error Invalid names cannot index the icon map.
icons['missing-icon'];
void [markup, label];
