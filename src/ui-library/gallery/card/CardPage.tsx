/**
 * CardPage — Gallery infrastructure
 * Phase 3: Showcase pattern.
 */

import { Download, MoreVertical } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { CardPlayground } from './CardPlayground';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { Badge } from '../badge/Badge';
import { Button } from '../button/Button';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['alert', 'badge', 'button']);

const CODE = {
  default: `import { Card, CardContent } from '@diwauhris/ui';

<Card>
  <CardContent>
    <p className="text-sm font-medium text-slate-600">
      Simple card with content only.
    </p>
  </CardContent>
</Card>`,

  withHeader: `import { Card, CardHeader, CardContent } from '@diwauhris/ui';
import { Badge } from '@diwauhris/ui';

<Card>
  <CardHeader
    title="Payroll Template A"
    description="Monthly pay for rank-and-file."
    actions={<Badge tone="success">Published</Badge>}
  />
  <CardContent>
    <p className="text-sm font-medium text-slate-500">
      Applies to all regular employees.
    </p>
  </CardContent>
</Card>`,

  withFooter: `import { Card, CardContent, CardFooter } from '@diwauhris/ui';
import { Download } from '@diwauhris/ui';
import { Button } from '@diwauhris/ui';

<Card>
  <CardContent>
    <p className="text-sm font-medium text-slate-500">
      Next payroll cut-off is in 3 days.
    </p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">
      <Download size={13} aria-hidden="true" /> Export
    </Button>
  </CardFooter>
</Card>`,

  elevated: `<Card variant="elevated">
  <CardContent>
    <p className="text-sm font-medium text-slate-500">
      Elevated surface — stronger shadow.
    </p>
  </CardContent>
</Card>`,

  outlined: `<Card variant="outlined">
  <CardContent>
    <p className="text-sm font-medium text-slate-500">
      Outlined surface — 2px border, no shadow.
    </p>
  </CardContent>
</Card>`,

  interactive: `<Card variant="interactive" onClick={handleClick}>
  <CardContent className="flex items-center gap-3">
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
      <FileText size={16} aria-hidden="true" />
    </div>
    <div>
      <p className="text-sm font-bold text-slate-800">View Profile</p>
      <p className="text-xs text-slate-400">Click to open</p>
    </div>
  </CardContent>
</Card>`,

  statCard: `// KPI / stat card
<Card>
  <CardHeader
    title="Active Employees"
    description="As of today"
    actions={<span className="text-2xl font-bold text-slate-900">247</span>}
  />
</Card>`,

};

export default function CardPage() {
  return (
    <GalleryLayout activeId="card">
      <title>Card — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Display"
          name="Card"
          importName="Card, CardHeader, CardContent, CardFooter"
          description="A contained surface for grouping related content. Compose it from CardHeader, CardContent, and CardFooter — or use it bare for a simple elevated panel."
          status="complete"
        />

        <GallerySection id="overview" title="Overview" description="Card composition at a glance. No code — explore the playground to experiment.">
          <ShowcasePreview standalone>
            <div className="w-full max-w-sm">
              <Card>
                <CardHeader title="Payroll Template A" description="Monthly computation for rank-and-file." actions={<Badge tone="success">Published</Badge>} />
                <CardContent>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">Applies to all regular employees on the standard pay schedule.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button variant="primary" size="sm">Save</Button>
                </CardFooter>
              </Card>
            </div>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="playground" title="Playground">
          <CardPlayground />
        </GallerySection>

        <GallerySection id="composition" title="Composition" description="Use only the sub-components you need.">
          <ShowcaseGrid columns={2}>
            <Showcase title="Content only" code={CODE.default}>
              <div className="w-64">
                <Card>
                  <CardContent>
                    <p className="text-sm font-medium text-slate-600">Simple card with content only.</p>
                  </CardContent>
                </Card>
              </div>
            </Showcase>

            <Showcase title="Header + content" description="CardHeader accepts title, description, and optional right-aligned actions." code={CODE.withHeader}>
              <div className="w-64">
                <Card>
                  <CardHeader title="Payroll Template A" description="Monthly pay for rank-and-file." actions={<Badge tone="success">Published</Badge>} />
                  <CardContent>
                    <p className="text-sm font-medium text-slate-500">Applies to all regular employees.</p>
                  </CardContent>
                </Card>
              </div>
            </Showcase>

            <Showcase title="Content + footer" description="CardFooter is right-aligned by default." code={CODE.withFooter}>
              <div className="w-64">
                <Card>
                  <CardContent>
                    <p className="text-sm font-medium text-slate-500">Next payroll cut-off is in 3 days.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">
                      <Download size={13} aria-hidden="true" /> Export
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </Showcase>

            <Showcase title="Stat card" description="Header only, value in the actions slot." code={CODE.statCard}>
              <div className="w-64">
                <Card>
                  <CardHeader title="Active Employees" description="As of today" actions={<span className="text-2xl font-bold text-slate-900">247</span>} />
                </Card>
              </div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        <GallerySection id="variants" title="Variants">
          <ShowcaseGrid columns={2}>
            <Showcase title="Default" description="Thin border, subtle shadow." code={CODE.default}>
              <div className="w-56">
                <Card><CardContent><p className="text-sm text-slate-500">Default variant</p></CardContent></Card>
              </div>
            </Showcase>

            <Showcase title="Elevated" description="Stronger shadow, thinner border." code={CODE.elevated}>
              <div className="w-56">
                <Card variant="elevated"><CardContent><p className="text-sm text-slate-500">Elevated variant</p></CardContent></Card>
              </div>
            </Showcase>

            <Showcase title="Outlined" description="2px border, no shadow." code={CODE.outlined}>
              <div className="w-56">
                <Card variant="outlined"><CardContent><p className="text-sm text-slate-500">Outlined variant</p></CardContent></Card>
              </div>
            </Showcase>

            <Showcase title="Interactive" description="Hover / active state. Renders as <button> when onClick is provided." code={CODE.interactive}>
              <div className="w-56">
                <Card variant="interactive" onClick={() => {}}>
                  <CardContent className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                      <MoreVertical size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">View Profile</p>
                      <p className="text-xs text-slate-400">Click to open</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {[
              ['Interactive variant', [
                'When onClick is provided, Card renders as a <button> element — keyboard accessible and correctly announced by screen readers.',
                'The interactive card gets a visible focus ring on focus-visible.',
                'Do not use the interactive variant for purely decorative cards — only when the whole card is a single clickable action.',
              ]],
              ['Heading hierarchy', [
                'CardHeader renders its title as an <h3> element. If you need a different heading level for your page outline, pass the title as children inside CardContent with an explicit heading element.',
                'The default <h3> is appropriate for most card contexts. Adjust if the card is a top-level landmark section that needs <h2>.',
              ]],
              ['Icons inside cards', [
                'Decorative icons in card content should have aria-hidden="true".',
                'The card container itself has no implicit ARIA role — screen readers read its content in document order.',
              ]],
            ].map(([heading, items]) => (
              <div key={String(heading)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(heading)}</h3>
                <ul className="space-y-1.5">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GallerySection>

        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'Card.variant',         type: "'default' | 'outlined' | 'elevated' | 'interactive'", default: "'default'", description: 'Visual style.' },
            { name: 'Card.onClick',         type: '() => void', description: 'When provided, renders as <button> with interactive styling.' },
            { name: 'CardHeader.title',     type: 'string',    required: true, description: 'Card heading.' },
            { name: 'CardHeader.description', type: 'string',  description: 'Sub-heading text.' },
            { name: 'CardHeader.actions',   type: 'ReactNode', description: 'Right-aligned content (badge, button, menu).' },
            { name: 'CardContent.className',type: 'string',    description: 'Additional CSS classes.' },
            { name: 'CardFooter.className', type: 'string',    description: 'Additional CSS classes.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
