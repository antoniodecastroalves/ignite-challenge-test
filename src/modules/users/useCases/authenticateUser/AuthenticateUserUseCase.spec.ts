import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Authenticate user", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
  });

  it("Should be able to authenticate a user", async () => {
      const password = await hash("1234", 8);

      await inMemoryUsersRepository.create({
        email: "username@email.com",
        name: "username",
        password: password
      });
      const session = await authenticateUserUseCase.execute({
        email: "username@email.com",
        password: "1234",
      });

      expect(session).toHaveProperty("token");
    });
  it("Should not be able to authenticate a wrong user password", async () => {
      const password = await hash("1234", 8);

      await inMemoryUsersRepository.create({
        email: "username@email.com",
        name: "username",
        password: password
      });
      expect(async () => {
        await authenticateUserUseCase.execute({
          email: "username@email.com",
          password: "4321",
        });
      }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
    });
  it("Should not be able to authenticate a wrong user e-mail", async () => {
      const password = await hash("1234", 8);

      await inMemoryUsersRepository.create({
        email: "username@email.com",
        name: "username",
        password: password
      });
      expect(async () => {
        await authenticateUserUseCase.execute({
          email: "wrong@email.com",
          password: "1234",
        });
      }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
    });
});
