import sync
import asyncio


async def main():
    s = sync.Sync()
    await s.save_notes_to_disk()

if __name__ == "__main__":
    asyncio.run(main())