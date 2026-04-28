import { prisma } from "../config/db.js";

// POST /api/shelf  — add a book to the user's shelf
// If the book doesn't exist in our DB yet, create it first (upsert)
const addBookToShelf = async (req, res) => {
  try {
    const userId = req.userId;
    const { bookId, title, author, coverUrl, description, status } = req.body;

    if (!bookId || !title) {
      return res.status(400).json({ error: "bookId and title are required" });
    }

    // Upsert the book so we always have a local record
    await prisma.book.upsert({
      where: { id: bookId },
      update: {},
      create: { id: bookId, title, author: author ?? "Unknown", coverUrl, description },
    });

    // Check if already on shelf
    const existing = await prisma.watchlist.findUnique({
      where: { userId_bookId: { userId, bookId } },
    });
    if (existing) {
      return res.status(409).json({ error: "Book is already on your shelf" });
    }

    const entry = await prisma.watchlist.create({
      data: {
        userId,
        bookId,
        status: status ?? "WANT_TO_READ",
      },
      include: { book: true },
    });

    res.status(201).json({ status: "success", data: { entry } });
  } catch (error) {
    console.error("addBookToShelf error:", error);
    res.status(500).json({ error: "Failed to add book to shelf" });
  }
};

// DELETE /api/shelf/:bookId  — remove a book from the user's shelf
const removeBookFromShelf = async (req, res) => {
  try {
    const userId = req.userId;
    const { bookId } = req.params;

    await prisma.watchlist.delete({
      where: { userId_bookId: { userId, bookId } },
    });

    res.status(200).json({ status: "success", message: "Book removed from shelf" });
  } catch (error) {
    console.error("removeBookFromShelf error:", error);
    res.status(500).json({ error: "Failed to remove book from shelf" });
  }
};

// PATCH /api/shelf/:bookId  — update status, rating, or review
const updateShelfEntry = async (req, res) => {
  try {
    const userId = req.userId;
    const { bookId } = req.params;
    const { status, rating, review, startedAt, finishedAt } = req.body;

    const entry = await prisma.watchlist.update({
      where: { userId_bookId: { userId, bookId } },
      data: {
        ...(status     !== undefined && { status }),
        ...(rating     !== undefined && { rating }),
        ...(review     !== undefined && { review }),
        ...(startedAt  !== undefined && { startedAt: new Date(startedAt) }),
        ...(finishedAt !== undefined && { finishedAt: new Date(finishedAt) }),
      },
      include: { book: true },
    });

    res.status(200).json({ status: "success", data: { entry } });
  } catch (error) {
    console.error("updateShelfEntry error:", error);
    res.status(500).json({ error: "Failed to update shelf entry" });
  }
};

// GET /api/shelf  — get the logged-in user's full shelf
const getMyShelf = async (req, res) => {
  try {
    const userId = req.userId;

    const shelf = await prisma.watchlist.findMany({
      where: { userId },
      include: { book: true },
      orderBy: { addedAt: "desc" },
    });

    res.status(200).json({ status: "success", data: { shelf } });
  } catch (error) {
    console.error("getMyShelf error:", error);
    res.status(500).json({ error: "Failed to fetch shelf" });
  }
};

export { addBookToShelf, removeBookFromShelf, updateShelfEntry, getMyShelf };
