# Security Specification for Firestore Rules

## 1. Data Invariants
- **Identity Isolation**: A user can only read, create, update, or delete documents within their own `/users/{userId}` hierarchy where `userId == request.auth.uid`.
- **Verified Users**: All write operations require verified email (`request.auth.token.email_verified == true`) or valid authenticated user.
- **Relational Integrity**: Sub-collections (`progress`, `interview_sessions`) are scoped strictly to the parent user path `/users/{userId}/...` and owner check `userId == request.auth.uid`.
- **Immutability of Key Identity**: The `userId` and creation timestamps cannot be altered once written.
- **Input Boundaries**: Scores are restricted between 0 and 100. Strings have explicit size constraints (`.size() <= MAX`).
- **No Blanket Public Reads**: Unauthenticated users cannot read user profiles, notes, or scorecards.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Read on User Profile**: Guest tries to fetch `/users/user_abc`. (Expect: PERMISSION_DENIED)
2. **User A reading User B's Notes**: Authenticated `user_1` tries to read `/users/user_2/progress/day_1`. (Expect: PERMISSION_DENIED)
3. **Cross-User Session Injection**: `user_1` attempts to write an interview session to `/users/user_2/interview_sessions/sess_1`. (Expect: PERMISSION_DENIED)
4. **Identity Spoofing in Payload**: `user_1` submits `userId: "user_2"` in the document body. (Expect: PERMISSION_DENIED)
5. **ID Poisoning Attack**: Attempting to write to `/users/{1000_char_string}/progress/day_1`. (Expect: PERMISSION_DENIED)
6. **Shadow Update / Field Injection**: Updating `UserProfile` with forbidden ghost field `isAdmin: true` or `role: "admin"`. (Expect: PERMISSION_DENIED)
7. **Score Overflow Attack**: Submitting an `InterviewSession` with `score: 9999` or `score: -50`. (Expect: PERMISSION_DENIED)
8. **Immortal Field Tampering**: Attempting to update `createdAt` to a backdated timestamp. (Expect: PERMISSION_DENIED)
9. **Unbounded Payload Flood**: Submitting `notes` with 50,000 characters (exceeding 5,000 limit). (Expect: PERMISSION_DENIED)
10. **Listing all users in /users**: Non-admin querying all users without `userId == request.auth.uid`. (Expect: PERMISSION_DENIED)
11. **Invalid Enum Track Injection**: Creating an `InterviewSession` with `track: "malicious_script"`. (Expect: PERMISSION_DENIED)
12. **Unverified Email Write Attack**: User with `email_verified == false` attempting to write when verification is strictly mandated. (Expect: PERMISSION_DENIED)

## 3. Test Runner
Included in test suite for validation of zero-trust security architecture.
