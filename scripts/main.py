import sync
import asyncio


async def main():
    s = sync.Sync()
    await s.get_notes()

if __name__ == "__main__":
    asyncio.run(main())
