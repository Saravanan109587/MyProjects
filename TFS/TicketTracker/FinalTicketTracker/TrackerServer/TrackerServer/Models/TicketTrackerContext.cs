using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TrackerServer.Models
{
    public partial class TicketTrackerContext : DbContext
    {
        public TicketTrackerContext()
        {
        }

        public TicketTrackerContext(DbContextOptions<TicketTrackerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Ticketmaster> Ticketmaster { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
 
                optionsBuilder.UseSqlServer("Server=.;Database=TicketTracker;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ticketmaster>(entity =>
            {
                entity.HasKey(e => e.TicketId);

                entity.Property(e => e.ClientName).HasMaxLength(50);

                entity.Property(e => e.Description)
                    .HasColumnName("DEscription")
                    .HasMaxLength(500);

                entity.Property(e => e.DeveloperName).HasMaxLength(50);

                entity.Property(e => e.Module).HasMaxLength(50);

                entity.Property(e => e.Priority).HasColumnName("priority");

                entity.Property(e => e.ShortNotes).HasMaxLength(50);
            });
        }
    }
}
