import { Test } from "@nestjs/testing";
import { AnimeService } from "./animes.service";
import { getModelToken } from "@nestjs/mongoose";
import { Anime } from "./schemas/anime.schema";
import mongoose, { Model } from "mongoose";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Query } from "mongoose";
import { User } from "../auth/schema/user.schema";
import { CreateAnimeDto } from "./dto/create-anime.dto";


describe('AnimeService', () => {
    const mockAnimeList = [
        {
            _id: '123',
            anime_name: 'Naruto',
            category: 'Action',
            description: 'A great anime.',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            _id: '124',
            anime_name: 'One Piece',
            category: 'Adventure',
            description: 'A legendary anime.',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];
 
    const mockAnimeModel = { 
        findById: jest.fn(), 
        find: jest.fn(),
        countDocuments: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        create: jest.fn(),
    };

    const mockAnime = {
        _id: "677f6e362e85d6c66f2f3f4a",
        anime_name: "Naruto and Boruto",
        image_link: "late",
        description: "later",
        readMore_link: "read more",
        category: "Drama",
        user: "677d3e0f6d8a3ca55a0337ac",
        // createdAt: "2025-01-09T06:35:34.777Z",
        // updatedAt: "2025-01-09T06:35:34.777Z",
        // __v: 0,
    };

    let animeService: AnimeService;
    let model: Model<Anime>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AnimeService,
                {
                    provide: getModelToken(Anime.name),
                    useValue: mockAnimeModel, // Changed to use the updated mockAnimeModel
                },
            ],
        }).compile();
        animeService = moduleRef.get<AnimeService>(AnimeService);
        model = moduleRef.get<Model<Anime>>(getModelToken(Anime.name));
    });

    describe('findById', () => {
        it('Should find an anime using a given ID', async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(mockAnime); // Mock implementation
            const result = await animeService.findAnime(mockAnime._id); // Actual service call
            expect(model.findById).toHaveBeenCalledWith(mockAnime._id); // Assertion for called method
            expect(result).toEqual(mockAnime); // Assertion for returned value
        });

        it('Should show error for invalid objectID', async () => {
            const mockInvalid_id = "invalid_id";
            const isValidObjectIdMock = jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(false); // Mock isValidObjectId

            await expect(animeService.findAnime(mockInvalid_id)).rejects.toThrow(BadRequestException); // Assertion for exception
            expect(isValidObjectIdMock).toHaveBeenCalledWith(mockInvalid_id); // Assertion for validation call
            isValidObjectIdMock.mockRestore(); // Restore original implementation
        });

        it('Should throw NotFoundException if anime not found', async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(null); // Mock return as null
            await expect(animeService.findAnime(mockAnime._id)).rejects.toThrow(NotFoundException); // Assertion for exception
            expect(model.findById).toHaveBeenCalledWith(mockAnime._id); // Assertion for called method
        });
    });

    describe('findAll', () => {


        it('Should give all anime', async () => {
            const query = { page: '1', anime_name: 'Naruto', category: 'Action' };

            jest.spyOn(model, 'find').mockImplementation(() => ({
                limit: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(mockAnimeList),
            }) as unknown as Query<any, any, any, any, any>); // Casting the mock return value
            jest.spyOn(model,'countDocuments').mockImplementation(()=>({
                exec:jest.fn().mockResolvedValue(mockAnimeList.length)
            }) as unknown as Query<any, any, any, any, any>)
            
            // Call the service method
            const result = await animeService.findAll(query);
        
            // Verify the methods were called
            expect(model.find).toHaveBeenCalledTimes(1);
            expect(model.find).toHaveBeenCalledWith({
                anime_name: { $regex: 'Naruto', $options: 'i' },
                category: { $regex: 'Action', $options: 'i' },
            });
            expect(model.countDocuments).toHaveBeenCalledWith({
                anime_name: { $regex: 'Naruto', $options: 'i' },
                category: { $regex: 'Action', $options: 'i' },
            });
        
            // Verify the result
            expect(result).toEqual({
                data: mockAnimeList,
                metadata: {
                    numOfAnime: mockAnimeList.length,
                    totalPages: 1,
                    currentPage: 1,
                    perPage: 5,
                },
            });
        });
        
        it('Should give all anime with empty query',async()=>{
            const query={page:'1'};
            jest.spyOn(model,'find').mockImplementation(() => ({
                limit: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(mockAnimeList),
            }) as unknown as Query<any, any, any, any, any>); // Casting the mock return value
            const result= await animeService.findAll(query)
            expect(model.find).toHaveBeenCalledWith({})
            expect(result).toEqual({
                data: mockAnimeList,
                metadata: {
                    numOfAnime: mockAnimeList.length,
                    totalPages: 1,
                    currentPage: 1,
                    perPage: 5,
                },
            })
        })

        it('Should give empty array with invalid anime name',async()=>{
            const query={page:'1',anime_name:'boruto',category:'Action'}
            jest.spyOn(model,'find').mockImplementation(() => ({
                limit: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue([]),
            }) as unknown as Query<any, any, any, any, any>); // Casting the mock return value
            jest.spyOn(model, 'countDocuments').mockImplementation(() => ({
                exec: jest.fn().mockResolvedValue(0),
            }) as unknown as Query<any, any, any, any, any>); // No documents found
            const result=await animeService.findAll(query)
            expect(model.find).toHaveBeenCalledWith(
                {
                    anime_name: { $regex: 'boruto', $options: 'i' },
                    category: { $regex: 'Action', $options: 'i' },
                }
            )
            expect(model.countDocuments).toHaveBeenCalledWith(
                {
                    anime_name: { $regex: 'boruto', $options: 'i' },
                    category: { $regex: 'Action', $options: 'i' },
                }
            )
            expect(result).toEqual({
                data: [],
                metadata: {
                    numOfAnime: 0,
                    totalPages: 0,
                    currentPage: 1,
                    perPage: 5,
                },
            })

        })
        
    });

    describe('updateById',()=>{

        // it('Should update anime by using Id',async()=>{

        //     const mockUpdatedAnime={...mockAnime,
        //         anime_name: "Baruto",
        //         category: "Drama",
        //     }

        //     jest.spyOn(model, 'findByIdAndUpdate').mockImplementation(() => ({
        //         exec: jest.fn().mockResolvedValue(mockUpdatedAnime),
        //     }) as unknown as Query<any, any, any, any, any>);

        //     const result=await animeService.updateById("100",{anime_name:"Baruto",description:"okkay",category:"Drama",image_link:"dd",readMore_link:"dfdf"})
        //     console.log("my result",result)

        //     expect(model.findByIdAndUpdate).toHaveBeenCalledWith("100",{anime_name:"Baruto",description:"okkay",category:"Drama",image_link:"dd",readMore_link:"dfdf"},{new: true, runValidators: true})
        //     expect(result).toEqual(mockUpdatedAnime)

            
        // })


        it('Should update an anime successfully', async () => {
            const updatedAnime = { ...mockAnime, anime_name: 'Updated Naruto' };
            jest.spyOn(model, 'findByIdAndUpdate').mockImplementation(() => ({
                exec: jest.fn().mockResolvedValue(updatedAnime),
            })as unknown as Query<any, any, any, any, any>);

            const result = await animeService.updateById('155', updatedAnime);

            expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
                '155',
                updatedAnime,
                { new: true, runValidators: true },
            );
            expect(result).toEqual(updatedAnime);
        });

    })

    describe('createAnime', () => {
        const mockUser = {
            _id: "123456",
            user_name: "dummy",
            user_email: "dummy@dummy.com",
        } as User;

        const mockInputAnime = {
            anime_name: "Naru",
            description: "dummy",
            category: "Drama",
            readMore_link: "dummy",
            image_link: "dummy",
        } as CreateAnimeDto;

        it('Should create a new anime with the provided user ID', async () => {
            
            const data = Object.assign(mockInputAnime, { user: mockUser._id });
    
            const mockCreatedAnime = {
                ...data,
                _id: "1234545",
                createdAt: new Date(),
                updatedAt: expect.any(Date),
                __v: 0 
            };
            jest.spyOn(model, 'create').mockResolvedValue(mockCreatedAnime as any);
    
            // Call the service method (not the model directly)
            const result = await animeService.createAnime(mockInputAnime, mockUser);
    
            // Verify the result
            expect(result).toEqual({
                anime_name: "Naru",
                description: "dummy",
                category: "Drama",
                readMore_link: "dummy",
                image_link: "dummy",
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
                user: mockUser._id,
                _id: "1234545",
                __v: 0
            });
            
    
            // Check that the create method was called with the expected data
            expect(model.create).toHaveBeenCalledWith(data);
        });
        






        // it("Should create a new anime with the provided user ID",async()=>{
        //     const newAnime={
        //         anime_name: "Naruto and Boruto",
        //         image_link: "late",
        //         description: "later",
        //         readMore_link: "read more",
        //         category: "Drama",
        //     }
        //     jest.spyOn(model,'create').mockImplementationOnce(()=>Promise.resolve(mockAnime as any))
        //     const result= await animeService.createAnime(
        //         newAnime as CreateAnimeDto,
        //         mockUser as User
        //     )
        //     expect(result).toEqual(mockAnime)   
        // })
    
    });
    
});
