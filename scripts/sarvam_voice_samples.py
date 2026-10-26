"""Makes Priya's opening line in a few Sarvam voices so they can be compared by ear.
Reads SARVAM_API_KEY from the environment or the project's .env. Writes mp3s to sarvam-samples/."""
import base64
import os
from pathlib import Path

from sarvamai import SarvamAI

root = Path(__file__).resolve().parent.parent
env_file = root / ".env"
if env_file.exists():
    for line in env_file.read_text().splitlines():
        key, sep, value = line.partition("=")
        if sep and key.strip() and not line.lstrip().startswith("#"):
            os.environ.setdefault(key.strip(), value.strip())

api_key = os.environ.get("SARVAM_API_KEY", "").strip()
if not api_key:
    raise SystemExit("SARVAM_API_KEY is not set. Add it to .env in the project root.")

OPENING_LINE = (
    "Hi, I'm Priya, and I'll be your interviewer today. "
    "We'll start with a product design question. Take your time, think out loud, "
    "and feel free to ask me clarifying questions. Ready when you are."
)
VOICES = ["simran_en_conversation", "aparna_en_edtech", "roopa_en_conversational"]

client = SarvamAI(api_subscription_key=api_key)
out_dir = root / "sarvam-samples"
out_dir.mkdir(exist_ok=True)

for voice in VOICES:
    response = client.text_to_speech.convert(
        text=OPENING_LINE,
        language_code="en-IN",
        model="bulbul:v4-flash",
        speaker=voice,
        output_audio_codec="mp3",
    )
    path = out_dir / f"priya_{voice}.mp3"
    path.write_bytes(base64.b64decode("".join(response.audios)))
    print(f"Saved {path.relative_to(root)}")
