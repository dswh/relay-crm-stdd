# What good and bad tests look like

Test **behavior through the public interface**, not implementation. A test should read like a sentence from the spec and survive any refactor that keeps behavior the same.

## Good — behavior through a public seam

```typescript
// Exercises the real module through its interface; asserts user-facing behavior.
test("a lead gains points when it replies to an email", async () => {
  const db = await makeTestDb();
  const scoring = createScoringService({ db });

  await scoring.recordReply({ leadId: "lead1" });

  const total = await scoring.getScore({ leadId: "lead1" });
  expect(total).toBe(10);
});
```

Why it's good: drives a real code path, asserts an observable outcome (`getScore`), and says nothing about *how* the score is stored. Rename internals, swap the table, refactor freely — the test still holds.

## Bad — coupled to implementation

```typescript
// Tests internal structure, not behavior. Breaks on harmless refactors.
test("inserts a row into score_events", async () => {
  const spy = vi.spyOn(repo, "insertScoreEvent"); // internal collaborator
  await scoring.recordReply({ leadId: "lead1" });
  expect(spy).toHaveBeenCalledWith({ leadId: "lead1", delta: 10 }); // implementation detail
});
```

Why it's bad: mocks an internal collaborator and asserts a private call shape. The moment you rename `insertScoreEvent` or batch writes, the test fails though nothing the user cares about changed. It tests the *how*.

## Heuristics

- **Pick the highest seam that still reaches the behavior.** Prefer one integration test at the service/route boundary over five unit tests on private helpers. The interface is the test surface (see `/deepen`).
- **Use a real (test) database or fake adapter, not a mock of your own code.** Replace what you don't own at the edge; don't mock what you do own internally.
- **Assert on outputs and observable side effects**, never on internal calls.
- **The rename test:** if renaming a private function breaks a test without any behavior change, that test is testing implementation. Delete or rewrite it.
- **Name the test after the capability**, e.g. `"cold lead cannot be auto-dialed"`, not `"returns 403"`.
