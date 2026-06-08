# GITHUB_AUTH.md — Setup Required

## The Problem
Git push to GitHub requires authentication. No SSH key or PAT is configured locally.

## Fix (takes 2 minutes)

1. Go to: https://github.com/settings/tokens/new
2. Name: `hermes-agent`
3. Expiration: 90 days
4. Scopes: check `repo` (full control of private repositories)
5. Click **Generate token** — copy it immediately

## Then run this in terminal:

```
cd C:\Users\danap\ND-cognitive-OS
git remote set-url origin https://github.com/daana723/ND-cognitive-OS.git
git push origin main
```

When asked for username: `daana723`
When asked for password: **paste your token**

## Alternative (SSH, more permanent)

If you want passwordless pushes going forward:
1. Generate SSH key: `ssh-keygen -t ed25519 -C "danapandaa@gmail.com"`
2. Add to GitHub: https://github.com/settings/keys
3. Change remote: `git remote set-url origin git@github.com:daana723/ND-cognitive-OS.git`

---

## While waiting for auth — local commit is safe
All work is committed locally at `C:\Users\danap\ND-cognitive-OS`
Nothing is lost even if push fails.
