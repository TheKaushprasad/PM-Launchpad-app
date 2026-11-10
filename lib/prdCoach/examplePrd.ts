// A hand-written example PRD for the PRD Coach, shown to anyone before they start (no AI call).
// It follows the coach's seven sections and checklists, so learners see what each one looks like.
// The product is generic on purpose; every number is marked as an assumption, not real data.

export const EXAMPLE_PRD_TITLE = 'One-tap reorder of a weekly grocery basket (quick-commerce app)';

export const EXAMPLE_PRD_MARKDOWN = `## Problem

- Weekly shoppers rebuild almost the same basket every week by searching and adding 12-20 items one by one.
- In 8 user interviews, 6 people said this takes them over 10 minutes, and 5 said they often forget at least one item (small sample: treat as a signal, not proof).
- About 30% of orders come from users who order every week (assumption: to confirm with a data pull).
- **Why now:** competitors already offer reorder, and repeat users are the cheapest orders to win. A slow weekly shop is a reason to switch apps.

## Target users

- **Primary:** working parents in metro cities who order groceries 3+ times a month and buy mostly the same staples.
- **What they do today:** scroll through past orders, then search and add each item again. Some keep a list in WhatsApp or Notes.
- **Not the focus:** first-time users and occasional shoppers, who have no pattern to repeat yet.

## Goals and success metrics

- **Primary:** weekly shoppers who place a reorder go from 0% to 25% within 8 weeks of launch (assumption).
- **Supporting:** time from app open to order placed for repeat orders drops from about 10 minutes to under 3 (assumption).
- **Supporting:** "forgot an item" second orders within 2 hours drop by 20%.
- **Guardrail:** average order value must not fall by more than 3%. Reordering the same basket could reduce discovery of new items.

## Scope and non-goals

**In V1**
- Reorder any past order in one tap, with all items added to the cart for review.
- Out-of-stock items are flagged, with a suggested substitute.

**Not in V1**
- Auto-scheduled weekly orders: needs payment and delivery-slot changes.
- Multiple named baskets ("Weekly", "Party"): wait to see whether people use one first.
- Smart suggestions based on habits: needs more data than V1 will have.

## Requirements

**Must**
- As a weekly shopper, I want to reorder a past order in one tap, so that I don't rebuild my basket.
  - Acceptance: a "Reorder" button on each of the last 10 orders adds every item to the cart in under 2 seconds.
- As a shopper, I want to know what is out of stock before I pay, so that I am not surprised at delivery.
  - Acceptance: unavailable items show a label and one substitute; the user can accept, remove or swap it.

**Should**
- As a shopper, I want to edit quantities in the cart after reordering, so that I buy only what I need this week.
  - Acceptance: quantity steppers work on reordered items like any other item.

**Could**
- As a shopper, I want to see "you usually buy this" on items missing from my cart, so that I don't forget them.

## Risks and dependencies

- **Lower basket variety (business):** users may stop discovering new products. Mitigation: show "you might also need" under the reordered cart, and watch the average order value guardrail.
- **Stock data lag (technical):** reorder may add items that went out of stock minutes ago. Mitigation: check stock again at checkout.
- **Dependencies:** catalogue team for substitute suggestions; order history service must return the last 10 orders quickly.
- **Unvalidated assumption:** that weekly baskets are similar enough week to week to make reorder useful.

## Open questions

- Do people want one saved basket or several? Answer with a 2-week test of a "Save as basket" button (owner: PM).
- Should reorder use today's prices or flag price changes? Answer with 5 user interviews (owner: design).
- How similar are weekly baskets really? Answer with a data pull of item overlap between consecutive orders (owner: analytics).`;
