"""One Sarvam chat completion call. Reads SARVAM_API_KEY from the environment or the project's .env."""
import os
from pathlib import Path

from sarvamai import SarvamAI

# Load .env from the project root without extra dependencies; real env vars win.
env_file = Path(__file__).resolve().parent.parent / ".env"
if env_file.exists():
    for line in env_file.read_text().splitlines():
        key, sep, value = line.partition("=")
        if sep and key.strip() and not line.lstrip().startswith("#"):
            os.environ.setdefault(key.strip(), value.strip())

api_key = os.environ.get("SARVAM_API_KEY", "").strip()
if not api_key:
    raise SystemExit("SARVAM_API_KEY is not set. Add it to .env in the project root.")

client = SarvamAI(api_subscription_key=api_key)
response = client.chat.completions(
    model="sarvam-105b-conversations",
    messages=[{"role": "user", "content": "Say hello in one short sentence."}],
)
print(response.choices[0].message.content)
