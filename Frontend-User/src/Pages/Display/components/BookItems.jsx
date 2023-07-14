
import BookCard from "./BookCard";

const BookItems = () => {
  return (
    <div className="bg-gray-900 text-base-900 py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="form-control mx-auto">
          <input
            type="text"
            placeholder="🔎 Search for Book"
            className="input input-bordered md:w-96 bg-white placeholder:text-black"
          />
        </div>

        <div className="flex justify-around  items-stretch flex-wrap max-w-6xl mx-auto">
          <BookCard
            title="The Alchemist"
            author="Paulo Coelho"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/The_Alchemist_by_Paulo_Coelho.jpg/220px-The_Alchemist_by_Paulo_Coelho.jpg"
            description="An inspiring story about following your dreams."
          />
          <BookCard
            title="The Hitchhiker's Guide to the Galaxy"
            author="Douglas Adams"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/HitchhikersGuideCover.jpg/220px-HitchhikersGuideCover.jpg"
            description="A hilarious and thought-provoking adventure through space."
          />
          <BookCard
            title="The Lord of the Rings"
            author="J.R.R. Tolkien"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/The_Lord_of_the_Rings_%28book_cover%29.jpg/220px-The_Lord_of_the_Rings_%28book_cover%29.jpg"
            description="A classic fantasy epic about good versus evil."
          />
          <BookCard
            title="To Kill a Mockingbird"
            author="Harper Lee"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/To_Kill_a_Mockingbird_cover.jpg/220px-To_Kill_a_Mockingbird_cover.jpg"
            description="A powerful story about racism and courage."
          />
          <BookCard
            title="The Book Thief"
            author="Markus Zusak"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/9/92/The_Book_Thief_cover.jpg/220px-The_Book_Thief_cover.jpg"
            description="A moving story about a young girl who discovers the power of words during World War II."
          />
          <BookCard
            title="The Kite Runner"
            author="Khaled Hosseini"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/6/65/The_Kite_Runner_cover.jpg/220px-The_Kite_Runner_cover.jpg"
            description="A heartbreaking story about friendship and betrayal in Afghanistan."
          />
          <BookCard
            title="The Hunger Games"
            author="Suzanne Collins"
            image="https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/The_Hunger_Games_cover.jpg/220px-The_Hunger_Games_cover.jpg"
            description="A thrilling and suspenseful story about a young girl who must fight to survive in a deadly competition."
          />
        </div>
      </div>
    </div>
  );
};

export default BookItems;