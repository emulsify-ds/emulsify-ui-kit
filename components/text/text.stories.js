import heading from './headings/_heading.twig';
import blockquoteTemplate from './text/02-blockquote.twig';
import preTemplate from './text/05-pre.twig';
import paragraphTemplate from './text/03-inline-elements.twig';
import codeTemplate from './text/07-code.twig';
import blockquoteData from './text/blockquote.yml';
import headingData from './headings/headings.yml';
import codeData from './text/code.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Components/Typography' };

export const headings = () =>
  `<div class="text-long"> ${headingData
    .map((d) => heading(d))
    .join('')}</div>`;

export const blockquote = () => blockquoteTemplate(blockquoteData);

export const preformatted = () => preTemplate();

export const random = () => paragraphTemplate();

export const code = () => codeTemplate(codeData);

export const example =
  () => `<section style="max-width: 700px; margin: 0 auto;" class="text-long text-field">
<h1>Little Women (or Meg, Jo, Beth, and Amy)</h1>
<p>By Louisa May Alcott</p>
<h2>I. Playing Pilgrims</h2>
<p>"Christmas won't be Christmas without any presents," grumbled Jo, lying on the rug.</p>
<p>"It's so dreadful to be poor!" sighed Meg, looking down at her old dress.</p>
<p>"I don't think it's fair for some girls to have plenty of pretty things, and other girls nothing at all," added little Amy, with an injured sniff.</p>
<p>"We've got father and mother and each other," said Beth contentedly, from her corner.</p>
<p>The four young faces on which the firelight shone brightened at the cheerful words, but darkened again as Jo said sadly,—</p>
<p>"We haven't got father, and shall not have him for a long time." She didn't say "perhaps never," but each silently added it, thinking of father far away, where the fighting was.</p>
<h3>Nobody spoke for a minute; then Meg said in an altered tone,—</h3>
<p>"You know the reason mother proposed not having any presents this Christmas was because it is going to be a hard winter for every one; and she thinks we ought not to spend money for pleasure, when our men are suffering so in the army. We can't do much, but we can make our little sacrifices, and ought to do it gladly. But I am afraid I don't;" and Meg shook her head, as she thought regretfully of all the pretty things she wanted.</p>
<p>"But I don't think the little we should spend would do any good. We've each got a dollar, and the army wouldn't be much helped by our giving that. I agree not to expect anything from mother or you, but I do want to buy Undine and Sintram for myself; I've wanted it so long," said Jo, who was a bookworm.</p>
<h4>"I planned to spend mine in new music," said Beth, with a little sigh, which no one heard but the hearth-brush and kettle-holder.</h4>
<p>"I shall get a nice box of Faber's drawing-pencils; I really need them," said Amy decidedly.</p>
<p>"Mother didn't say anything about our money, and she won't wish us to give up everything. Let's each buy what we want, and have a little fun; I'm sure we work hard enough to earn it," cried Jo, examining the heels of her shoes in a gentlemanly manner.</p>
<p>"I know I do,—teaching those tiresome children nearly all day, when I'm longing to enjoy myself at home," began Meg, in the complaining tone again.</p>
<p>"You don't have half such a hard time as I do," said Jo. </p>

<blockquote>
"How would you like to be shut up for hours with a nervous, fussy old lady, who keeps you trotting, is never satisfied, and worries you till you're ready to fly out of the window or cry?"
</blockquote>
<p>"It's naughty to fret; but I do think washing dishes and keeping things tidy is the worst work in the world. It makes me cross; and my hands get so stiff, I can't practise well at all;" and Beth looked at her rough hands with a sigh that any one could hear that time.</p>
<p>"I don't believe any of you suffer as I do," cried Amy; "for you don't have to go to school with impertinent girls, who plague you if you don't know your lessons, and laugh at your dresses, and label your father if he isn't rich, and insult you when your nose isn't nice."


<ul>
<li>"If you mean libel, I'd say so, and not talk about labels, as if papa was a pickle-bottle," advised Jo, laughing.</li>
<li>"I know what I mean, and you needn't be statirical about it. It's proper to use good words, and improve your vocabilary," returned Amy, with dignity.</li>
<li>"Don't peck at one another, children. Don't you wish we had the money papa lost when we were little, Jo? Dear me! how happy and good we'd be, if we had no worries!" said Meg, who could remember better times.</li>
<li>"You said the other day, you thought we were a deal happier than the King children, for they were fighting and fretting all the time, in spite of their money."</li>
<li>"So I did, Beth. Well, I think we are; for, though we do have to work, we make fun for ourselves, and are a pretty jolly set, as Jo would say."</li>
<li>"Jo does use such slang words!" observed Amy, with a reproving look at the long figure stretched on the rug. Jo immediately sat up, put her hands in her pockets, and began to whistle.</li>
<li>"Don't, Jo; it's so boyish!"</li>
<li>"That's why I do it."</li>
</ul>


<p>"I detest rude, unlady-like girls!"</p>
<p>"I hate affected, niminy-piminy chits!"</p>
<p>"'Birds in their little nests agree,'" sang Beth, the peace-maker, with such a funny face that both sharp voices softened to a laugh, and the "pecking" ended for that time.</p>
<p>"Really, girls, you are both to be blamed," said Meg, beginning to lecture in her elder-sisterly fashion. "You are old enough to leave off boyish tricks, and to behave better, Josephine. It didn't matter so much when you were a little girl; but now you are so tall, and turn up your hair, you should remember that you are a young lady."</p>

<ol>
<li>"If you mean libel, I'd say so, and not talk about labels, as if papa was a pickle-bottle," advised Jo, laughing.</li>
<li>"I know what I mean, and you needn't be statirical about it. It's proper to use good words, and improve your vocabilary," returned Amy, with dignity.</li>
<li>"Don't peck at one another, children. Don't you wish we had the money papa lost when we were little, Jo? Dear me! how happy and good we'd be, if we had no worries!" said Meg, who could remember better times.</li>
<li>"You said the other day, you thought we were a deal happier than the King children, for they were fighting and fretting all the time, in spite of their money."</li>
<li>"So I did, Beth. Well, I think we are; for, though we do have to work, we make fun for ourselves, and are a pretty jolly set, as Jo would say."</li>
<li>"Jo does use such slang words!" observed Amy, with a reproving look at the long figure stretched on the rug. Jo immediately sat up, put her hands in her pockets, and began to whistle.</li>
<li>"Don't, Jo; it's so boyish!"</li>
<li>"That's why I do it."</li>
</ol>
</section>`;
